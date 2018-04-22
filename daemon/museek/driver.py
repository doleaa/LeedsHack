# pymuseekd - Python tools for museekd
#
# Copyright (C) 2003-2004 Hyriand <hyriand@thegraveyard.org>
#
# This program is free software; you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation; either version 2 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program; if not, write to the Free Software
# Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA

import random
import socket
import struct

from Crypto.Cipher import AES
from Crypto.Hash import SHA256, SHA

from museek import messages


class Cipher:
    def __init__(self, key):
        self.ctx = AES.new(SHA256.new(key).digest())

    def decipher(self, value):
        return self.ctx.decrypt(value)

    def cipher(self, value):
        block = value
        while len(block) % 16:
            block += chr(random.randint(0, 255))
        return self.ctx.encrypt(block)


class InvalidHostException(Exception):
    pass


class InvalidMessageException(Exception):
    pass


class UnknownMessageException(Exception):
    pass


MSGTAB = {}
for _message in dir(messages):
    message = getattr(messages, _message)
    if not hasattr(message, 'code'):
        continue
    MSGTAB[message.code] = message


class Driver:
    def __init__(self, callback=None):
        self.socket = None
        self.is_connected = False
        self.logged_in = False
        self.password = None
        self.mask = None
        self.cipher = None
        self.sync_id = 0
        self.callback = callback

    # Connect to museekd, host in the form of "/tmp/museekd.user" for unix sockets
    def connect(self, host, password, mask=0):
        self.password = password
        self.mask = mask
        # Connect to a unix socket
        self.socket = socket.socket(socket.AF_UNIX, socket.SOCK_STREAM)
        try:
            self.socket.connect(host)
            print(f"Connected to {host}")
            self.is_connected = True
        except Exception as e:
            self.socket = None
            raise e

    def disconnect(self):
        self.socket.shutdown(socket.SHUT_RDWR)
        self.socket.close()

    # Fetch and parse a message from museekd, blocks until an entire message is read
    def fetch(self):
        # Unpack the first 8 bytes of the message
        data_chunks = self.receive_data(8)

        # First 4 bytes are the length
        length = struct.unpack("<i", data_chunks[:4])[0]

        if length < 4:
            raise InvalidMessageException('received invalid message length (%i)' % length)

        # Second 4 bytes are the message code
        code = struct.unpack("<I", data_chunks[4:])[0]
        # If message is longer than it's code, unpack all data

        data_chunks = "".encode()
        bytes_recd = 0
        if length > 4:
            length -= 4
            data_chunks += self.receive_data(length)

        # If message doesn't match known messages, raise an error
        if code not in MSGTAB:
            raise UnknownMessageException('received unknown message type 0x%04X' % code)
        # Parse message with the message's class parse function
        m = MSGTAB[code]()
        m.cipher = self.cipher
        try:
            newmessage = m.parse(data_chunks)
        except Exception as e:
            self.pass_error(e)
            return None
        else:
            return newmessage

    def receive_data(self, length):
        data_chunks = "".encode()
        bytes_recd = 0
        while bytes_recd < length:
            chunk = self.socket.recv(length - bytes_recd)
            if chunk == b'':
                raise RuntimeError("socket connection broken")
            data_chunks += chunk
            bytes_recd += len(chunk)
        return data_chunks

    def pass_error(self, error_message):
        if self.callback is not None:
            self.callback(error_message)

    # Send a message to museekd
    def send(self, message):
        message.cipher = self.cipher
        data = message.make()
        packet = message.pack_int(len(data)) + data
        self.socket.sendall(packet)

    # Fetch and process a message from museekd
    def process(self, message=None):
        if not self.socket:
            return
        if message is None:
            message = self.fetch()
            if not message:
                return

        # TODO: swap this for a dictionary
        if message.__class__ is messages.Ping:
            self.cb_ping()
        elif message.__class__ is messages.Challenge:
            chresp = SHA.new(message.challenge + "Angel1995".encode()).hexdigest()
            self.send(messages.Login("SHA1", chresp, self.mask))
        elif message.__class__ is messages.Login:
            self.logged_in = message.result
            if not self.logged_in:
                self.cb_login_error(message.msg)
            else:
                self.cb_login_ok()
                self.cipher = Cipher(self.password)
        elif message.__class__ is messages.ServerState:
            self.cb_server_state(message.state, message.username)
        elif message.__class__ is messages.CheckPrivileges:
            self.cb_server_privileges(message.time_left)
        elif message.__class__ is messages.SetStatus:
            self.cb_server_status_set(message.status)
        elif message.__class__ is messages.StatusMessage:
            self.cb_status_message(message.type, message.message)
        elif message.__class__ is messages.DebugMessage:
            self.cb_debug_message(message.domain, message.message)
        elif message.__class__ is messages.ChangePasword:
            self.cb_change_password(message.password)
        elif message.__class__ is messages.ConfigState:
            self.cb_config_state(message.config)
        elif message.__class__ is messages.ConfigSet:
            self.cb_config_set(message.domain, message.key, message.value)
        elif message.__class__ is messages.ConfigRemove:
            self.cb_config_remove(message.domain, message.key)
        elif message.__class__ is messages.PeerExists:
            self.cb_peer_exists(message.user, message.exists)
        elif message.__class__ is messages.PeerStatus:
            self.cb_peer_status(message.user, message.status)
        elif message.__class__ is messages.PeerStats:
            self.cb_peer_stats(message.user, message.avgspeed, message.numdownloads, message.numfiles, message.numdirs,
                               message.slotsfull, message.country)
        elif message.__class__ is messages.UserInfo:
            self.cb_user_info(message.user, message.info, message.picture, message.uploads, message.queue,
                              message.slotsfree)
        elif message.__class__ is messages.UserShares:
            self.cb_user_shares(message.user, message.shares)
        elif message.__class__ is messages.PeerAddress:
            self.cb_peer_address(message.user, message.ip, message.port)
        elif message.__class__ is messages.RoomState:
            self.cb_room_state(message.roomlist, message.joined_rooms, message.tickers)
        elif message.__class__ is messages.RoomList:
            self.cb_room_list(message.roomlist)
        elif message.__class__ is messages.PrivateMessage:
            self.cb_private_message(message.direction, message.timestamp, message.user, message.message)
        elif message.__class__ is messages.JoinRoom:
            self.cb_room_joined(message.room, message.users, message.private, message.owner, message.operators)
        elif message.__class__ is messages.LeaveRoom:
            self.cb_room_left(message.room)
        elif message.__class__ is messages.UserJoinedRoom:
            self.cb_room_user_joined(message.room, message.user, message.userdata)
        elif message.__class__ is messages.UserLeftRoom:
            self.cb_room_user_left(message.room, message.user)
        elif message.__class__ is messages.SayRoom:
            self.cb_room_said(message.room, message.user, message.line)
        elif message.__class__ is messages.RoomTickers:
            self.cb_room_tickers(message.room, message.tickers)
        elif message.__class__ is messages.RoomTickerSet:
            self.cb_room_ticker_set(message.room, message.user, message.message)
        elif message.__class__ is messages.AskPublicChat:
            self.cb_public_chat_ask()
        elif message.__class__ is messages.StopPublicChat:
            self.cb_public_chat_stop()
        elif message.__class__ is messages.PublicChat:
            self.cb_public_chat(message.room, message.user, message.message)
        elif message.__class__ is messages.PrivateRoomToggle:
            self.cb_private_room_toggle(message.enabled)
        elif message.__class__ is messages.PrivateRoomList:
            self.cb_private_room_list(message.rooms)
        elif message.__class__ is messages.PrivateRoomAddUser:
            self.cb_private_room_add_user(message.room, message.user)
        elif message.__class__ is messages.PrivateRoomRemoveUser:
            self.cb_private_room_remove_user(message.room, message.user)
        elif message.__class__ is messages.RoomMembers:
            self.cb_room_members(message.roomlist)
        elif message.__class__ is messages.RoomsTickers:
            self.cb_rooms_tickers(message.tickers)
        elif message.__class__ is messages.PrivateRoomAlterableMembers:
            self.cb_private_room_alterable_members(message.members)
        elif message.__class__ is messages.PrivateRoomAlterableOperators:
            self.cb_private_room_alterable_operators(message.operators)
        elif message.__class__ is messages.PrivateRoomAddOperator:
            self.cb_private_room_add_operator(message.room, message.user)
        elif message.__class__ is messages.PrivateRoomRemoveOperator:
            self.cb_private_room_remove_operator(message.room, message.user)
        elif message.__class__ is messages.Search:
            self.cb_search_ticket(message.query, message.ticket)
        elif message.__class__ is messages.SearchReply:
            self.cb_search_results(message.ticket, message.user, message.free, message.speed, message.queue,
                                   message.results)
        elif message.__class__ is messages.AddWishListItem:
            self.cb_wishlist_add(message.query, message.lastSearched)
        elif message.__class__ is messages.RemoveWishListItem:
            self.cb_wishlist_remove(message.query)
        elif message.__class__ is messages.TransferState:
            self.cb_transfer_state(message.downloads, message.uploads)
        elif message.__class__ is messages.TransferUpdate:
            self.cb_transfer_update(message.transfer)
        elif message.__class__ is messages.TransferRemove:
            self.cb_transfer_remove(message.transfer)
        elif message.__class__ is messages.TransferAbort:
            self.cb_transfer_abort(message.transfer)
        elif message.__class__ is messages.GetRecommendations:
            self.cb_get_recommendations(message.recommendations)
        elif message.__class__ is messages.GetGlobalRecommendations:
            self.cb_get_global_recommendations(message.recommendations)
        elif message.__class__ is messages.GetSimilarUsers:
            self.cb_get_similar_users(message.users)
        elif message.__class__ is messages.GetItemRecommendations:
            self.cb_get_item_recommendations(message.item, message.recommendations)
        elif message.__class__ is messages.GetItemSimilarUsers:
            self.cb_get_item_similar_users(message.item, message.users)
        elif message.__class__ is messages.AddInterest:
            self.cb_add_interest(message.interest)
        elif message.__class__ is messages.RemoveInterest:
            self.cb_remove_interest(message.interest)
        elif message.__class__ is messages.AddHatedInterest:
            self.cb_add_hated_interest(message.interest)
        elif message.__class__ is messages.RemoveHatedInterest:
            self.cb_remove_hated_interest(message.interest)
        else:
            print('Unhandled message:', message)

    def sync(self, ignore=False):
        local_sync_id = self.sync_id
        self.sync_id += 1
        self.send(messages.Ping(local_sync_id))
        while 1:
            try:
                message = self.fetch()
            except Exception as e:
                print(e)
                continue
            if message.__class__ == messages.Ping and message.id == local_sync_id:
                break
            elif not ignore:
                self.process(message)

    @staticmethod
    def display_shares(username, shares):
        browse_number = 0
        files_in_shares = 0
        for dirs, files in shares.items():
            for _ in files.keys():
                files_in_shares += 1
        len_shares = len(str(files_in_shares + 1))
        for dirs, files in shares.items():
            for filez, stats in files.items():
                browse_number += 1

                size = str(stats[0] / 1024) + "KB"
                ftype = stats[1]
                if ftype == b'':
                    ftype = "None"
                    length = "00:00"
                    bitrate = 'None'
                else:
                    bitrate = str(stats[2][0])
                    if bitrate == '':
                        bitrate = 'None'
                    length = str(stats[2][1])
                    if length != '' and length is not None:
                        minutes = int(length) / 60
                        seconds = str(int(length) - (60 * minutes))
                        if len(seconds) < 2:
                            seconds = '0' + seconds
                        length = str(minutes) + ":" + str(seconds)
                    else:
                        length = "00:00"

                filename = dirs + "\\" + filez
                number = " " * (len_shares - len(str(browse_number))) + str(browse_number)

                if ftype in ("mp3", "ogg", "MP3", "OGG"):
                    print(f"[{number}] Size: {size} slsk://{username}/{filename}  Length: {length} Bitrate: {bitrate}")
                else:
                    print(f"[{number}] Size: {size} slsk://{username}/{filename}  Filetype {ftype}")

    def cb_disconnected(self):
        pass

    def cb_ping(self):
        pass

    def cb_login_error(self, error):
        pass

    def cb_login_ok(self):
        pass

    def cb_server_state(self, state, username):
        pass

    def cb_status_message(self, msg_type, message):
        pass

    def cb_debug_message(self, domain, message):
        pass

    def cb_change_password(self, password):
        pass

    def cb_server_privileges(self, time_left):
        pass

    def cb_server_status_set(self, status):
        pass

    def cb_config_state(self, config):
        pass

    def cb_config_set(self, domain, key, value):
        pass

    def cb_config_remove(self, domain, key):
        pass

    def cb_peer_exists(self, user, exists):
        pass

    def cb_peer_status(self, user, status):
        pass

    def cb_peer_stats(self, user, avgspeed, numdownloads, numfiles, numdirs, slotsfull, country):
        pass

    def cb_peer_address(self, user, ip, port):
        pass

    def cb_room_state(self, roomlist, joined_rooms, tickers):
        pass

    def cb_room_list(self, roomlist):
        pass

    def cb_get_global_recommendations(self, recommendations):
        pass

    def cb_get_similar_users(self, users):
        pass

    def cb_get_recommendations(self, recommendations):
        pass

    def cb_get_item_similar_users(self, item, users):
        pass

    def cb_get_item_recommendations(self, item, recommendations):
        pass

    def cb_add_interest(self, interest):
        pass

    def cb_remove_interest(self, interest):
        pass

    def cb_add_hated_interest(self, interest):
        pass

    def cb_remove_hated_interest(self, interest):
        pass

    def cb_room_joined(self, room, users, private, owner, operators):
        pass

    def cb_room_left(self, room):
        pass

    def cb_room_user_joined(self, room, user, userdata):
        pass

    def cb_room_user_left(self, room, user):
        pass

    def cb_room_said(self, room, user, message):
        pass

    def cb_room_tickers(self, room, tickers):
        pass

    def cb_room_ticker_set(self, room, user, message):
        pass

    def cb_public_chat_ask(self):
        pass

    def cb_public_chat_stop(self):
        pass

    def cb_public_chat(self, room, user, message):
        pass

    def cb_private_room_toggle(self, enabled):
        pass

    def cb_private_room_list(self, rooms):
        pass

    def cb_private_room_add_user(self, room, user):
        pass

    def cb_private_room_remove_user(self, room, user):
        pass

    def cb_room_members(self, roomlist):
        pass

    def cb_rooms_tickers(self, tickers):
        pass

    def cb_private_room_alterable_members(self, members):
        pass

    def cb_private_room_alterable_operators(self, operators):
        pass

    def cb_private_room_add_operator(self, room, user):
        pass

    def cb_private_room_remove_operator(self, room, user):
        pass

    def cb_private_message(self, direction, timestamp, user, message):
        pass

    def cb_search_ticket(self, query, ticket):
        pass

    def cb_search_results(self, ticket, user, free, speed, queue, results):
        pass

    def cb_wishlist_add(self, query, last_searched):
        pass

    def cb_wishlist_remove(self, query):
        pass

    def cb_user_info(self, user, info, picture, uploads, queue, slotsfree):
        pass

    def cb_user_shares(self, user, shares):
        pass

    def cb_transfer_state(self, downloads, uploads):
        pass

    def cb_transfer_update(self, transfer):
        pass

    def cb_transfer_remove(self, transfer):
        pass

    def cb_transfer_abort(self, transfer):
        pass

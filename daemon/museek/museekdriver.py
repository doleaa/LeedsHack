import select
import sys
import time
from collections import deque

from museek import driver, messages


class DownloadDriver(driver.Driver):

    def __init__(self):
        super().__init__()
        self.is_connected = False
        self.tasks = deque()
        self.states = {0: "Finished", 1: "Transferring", 2: "Negotiating", 3: "Waiting", 4: "Establishing",
                       5: "Initiating", 6: "Connecting", 7: "Queued", 8: "Address", 9: "Status", 10: "Offline",
                       11: "Closed", 12: "Can't Connect", 13: "Aborted", 14: "Not Shared"}

    def add_task(self, task):
        self.tasks.append(task)
        print(f"Added {task} to the task queue")

    def process(self, **kwargs):
        r, w, x = select.select([self.socket, sys.stdin], [], [self.socket], 1)

        if self.socket in r:
            driver.Driver.process(self)
        if not self.is_connected:
            print("Disconnected from socket")
        elif len(self.tasks) > 0:
            task, args = self.tasks.pop()
            if task == "user_shares":
                self._get_user_shares(*args)
            elif task == "download_file":
                self._download_file(*args)
            elif task == "download_folder":
                self._download_folder(*args)
            else:
                print("[{task}] not recognized as a task")

    def _get_user_shares(self, source_user):
        self.send(messages.UserShares(source_user))
        print(f"getting shares for {source_user}")

    def _download_file(self, source_user, source_filepath):
        self.send(messages.DownloadFile(source_user, source_filepath))
        print(f"Downloading {source_filepath}")

    def _download_folder(self, source_user, source_filepath):
        self.send(messages.GetFolderContents(source_user, source_filepath))

    def _abort_download(self, source_user, source_filepath):
        self.send(messages.TransferAbort(0, source_user, source_filepath))  # d
        time.sleep(1)

    def _remove_download(self, source_user, source_filepath):
        self.send(messages.TransferRemove(0, source_user, source_filepath))
        time.sleep(1)

    def cb_user_shares(self, username, shares):
        self.display_shares(username, shares)
        sys.exit()

    def cb_peer_address(self, username, ip, port):
        print(f"{username}  IP: {str(ip)} Port: {str(port)}")

    def cb_peer_stats(self, username, avgspeed, num_downloads, numfiles, numdirs, slotsfull, country):
        print(f"Peer Stats for: {username} \nSpeed: {avgspeed} \tDownloads: {num_downloads} \nFiles: {numfiles} "
              f"\tDirectories: {numdirs}")

    def cb_disconnected(self):
        self.is_connected = False
        print("--- Disconnected from the Museek Daemon ---")

    def cb_login_error(self, reason):
        self.is_connected = 0
        if reason == "INVPASS":
            print("couldn't log in: Invalid Password")
        else:
            print("couldn't log in: " + reason)

    def cb_login_ok(self):
        self.is_connected = True

    def cb_server_state(self, state, username):

        if state:
            print("Connected to server, username: " + username)
        else:
            print("Not connected to server")

    def cb_transfer_state(self, downloads, uploads):
        for transfer in uploads:
            print("Upload: slsk://%s/%s\nSize: %s Pos: %s Rate: %s State: %s %s" % (
                transfer.user, transfer.path, transfer.filesize, transfer.filepos, transfer.rate,
                self.states[int(transfer.state)], transfer.error))
            print("- - - - - - - - - - - - - - - -")
        for transfer in downloads:
            print("Download: slsk://%s/%s\nSize: %s Pos: %s Rate: %s State: %s %s" % (
                transfer.user, transfer.path, transfer.filesize, transfer.filepos, transfer.rate,
                self.states[int(transfer.state)], transfer.error))
            print("- - - - - - - - - - - - - - - -")

    def cb_transfer_update(self, transfer):
        if transfer.is_upload:
            print("Upload: slsk://%s/%s\nSize: %s Pos: %s Rate: %s State: %s %s" % (
                transfer.user, transfer.path, transfer.filesize, transfer.filepos, transfer.rate,
                self.states[int(transfer.state)], transfer.error))
            print("- - - - - - - - - - - - - - - -")
        else:
            print("Download: slsk://%s/%s\nSize: %s Pos: %s Rate: %s State: %s %s" % (
                transfer.user, transfer.path, transfer.filesize, transfer.filepos, transfer.rate,
                self.states[int(transfer.state)], transfer.error))

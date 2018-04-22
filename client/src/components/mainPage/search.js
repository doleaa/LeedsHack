import React, {Component} from 'react'
import SearchInput, {createFilter} from 'react-search-input'
import {searchSong, updateSongSearch, downloadSong} from "../../actions";
import {connect} from "react-redux";
import './search.css'

const mapStateToProps = state => {
    return {
        username: state.creds.user,
        password: state.creds.pwd,
        songs: state.songs.list,
        searchTerm: state.songs.searchTerm
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateSongSearch: (str) => { dispatch(updateSongSearch(str))},
        search: (usr, psswd, term) => { dispatch(searchSong(usr, psswd, term)) },
        downloadSong: (username, password, songObj) => { dispatch(downloadSong(username, password, songObj))}
    }
}

const KEYS_TO_FILTERS = ['user.name', 'subject', 'dest.name']


const PreviewExecution = ({user, fn, download}) => {
    return (
        <div
            className="row execution mousable"
            onClick = {() => download()}
        >
            <div className="col-md-4 execution-date">
                { user }
            </div>
            <div className="col-md-8 query-preview">
                { fn }
            </div>
        </div>
    )
}

class Search extends Component {
    constructor (props) {
        super(props)
    }

    render () {

        const searchUpdated = str => {
            this.props.updateSongSearch(str)

        }

        const download = songObj => {
            this.props.downloadSong(this.props.username, this.props.password, songObj)

        }

        return (
            <div>
                <SearchInput className="search-input" onChange={searchUpdated} />
                {this.props.songs.length > 0 ? this.props.songs.map(song => {
                    return (
                        <PreviewExecution user={song.user} fn={song.file} download={() => download(song)}/>
                    )
                }) : null}
                <div className="col-xs-12">
                    <button className="btn" onClick={()=> {
                        this.props.search(this.props.username, this.props.password, this.props.searchTerm)
                    }}>Seek</button>
                </div>
            </div>
        )
    }

    searchUpdated (term) {
        this.setState({searchTerm: term})
    }
}

const ConnectedSearch = connect(mapStateToProps, mapDispatchToProps)(Search)

export default ConnectedSearch
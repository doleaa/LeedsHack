import React, {Component} from 'react'
import SearchInput, {createFilter} from 'react-search-input'
import {searchSong, updateSongSearch} from "../../actions";
import {connect} from "react-redux";

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
    }
}

const KEYS_TO_FILTERS = ['user.name', 'subject', 'dest.name']

class Search extends Component {
    constructor (props) {
        super(props)
    }

    render () {

        const searchUpdated = str => {
            this.props.updateSongSearch(str)

        }

        return (
            <div>
                <SearchInput className="search-input" onChange={searchUpdated} />
                {this.props.songs.length > 0 ? this.props.songs.map(song => {
                    return (
                        <div>{song}</div>
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
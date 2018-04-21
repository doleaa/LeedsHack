import React from 'react'
import './Header.css'
import { goHome, setGroupType, setResponse } from './../../actions'
import { connect } from 'react-redux'

const mapDispatchToProps = dispatch => {
    return {
        goHome: () => {
            dispatch(goHome())
        },
        setGroupType: groupType => {
            dispatch(setGroupType(groupType))
        },
        setResponse: response => {
            dispatch(setResponse(response))
        }
    }
}

const DisconnectedHeader = ({ goHome, setGroupType, setResponse }) => (
    <div className="row">
        <div className="col-md-10">
            <h1 onClick={() => {goHome(); setGroupType(""); setResponse("")}}>TravelMate</h1>
        </div>

        <div className="col-md-2">
            <h2>About  Us</h2>
        </div>
    </div>
)

const Header = connect(null, mapDispatchToProps)(DisconnectedHeader)

export default Header
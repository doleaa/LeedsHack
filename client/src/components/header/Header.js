import React from 'react'
import './Header.css'
import { goHome, setGroupType, setResponse } from './../../actions'
import { connect } from 'react-redux'
import logoSlsk from '../../img/logo.svg'

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
        <div className="col-md-12">
            <h1 onClick={() => {goHome(); setGroupType(""); setResponse("")}}>
                <img className="logoSlsk" src={logoSlsk} alt="Powered by SoulSeek"/>
                Nuseek
            </h1>
        </div>
    </div>
)

const Header = connect(null, mapDispatchToProps)(DisconnectedHeader)

export default Header
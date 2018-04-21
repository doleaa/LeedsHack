import React from 'react'
import './Header.css'
import { pingServer } from './../../actions'
import { connect } from 'react-redux'
import logoSlsk from '../../img/logo.svg'

const mapDispatchToProps = dispatch => {
    return {
        pingServer: () => {
            dispatch(pingServer("troliator96", "troliator96"))
        }
    }
}

const DisconnectedHeader = ({ pingServer }) => (
    <div className="row">
        <div className="col-md-12">
            <h1 onClick={() => {pingServer()}}>
                <img className="logoSlsk" src={logoSlsk} alt="Powered by SoulSeek"/>
                Nuseek
            </h1>
        </div>
    </div>
)

const Header = connect(null, mapDispatchToProps)(DisconnectedHeader)

export default Header
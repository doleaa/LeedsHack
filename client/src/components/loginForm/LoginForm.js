import React from 'react'
import Editor from './../editor/Editor'
import ExecutionButtons from './../executionButtons/ExecutionButtons'
import { setLoginUserName,
        setLoginPassword,
        pingServer } from './../../actions'
import { connect } from 'react-redux'

const mapStateToProps = state => {
    return {
        userName: state.login.userName,
        password: state.login.password
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setLoginPassword: password => { dispatch(setLoginPassword(password)) },
        setLoginUserName: userName => { dispatch(setLoginUserName(userName)) },
        pingServer: (userName, password) => { dispatch(pingServer(userName, password)) }
    }
}

const DisconnectedLoginForm = ({userName, password, setLoginUserName, setLoginPassword, pingServer}) => {
    const updateUserName = event => {
        setLoginUserName(event.target.value)
    }
    const updatePassword = event => {
        setLoginPassword(event.target.value)
    }
    const login = () => { pingServer(userName, password) }

    return (
        <div className='row'>
            <Editor
                rows={2}
                initialValue={userName}
                updateValue={updateUserName}
                placeholder="User Name"
            />
            <Editor
                rows={2}
                initialValue={password}
                updateValue={updatePassword}
                placeholder="Password"
            />
            <ExecutionButtons
                execute={login}
                name={"Login"}
            />
        </div>
    )
}

const LoginForm = connect(mapStateToProps, mapDispatchToProps)(DisconnectedLoginForm)
export default LoginForm
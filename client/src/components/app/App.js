import React from 'react'
import Header from './../header/Header'
import MainPage from './../mainPage/MainPage'
import Footer from './../footer/Footer'
import LoginForm from './../loginForm/LoginForm'
import './App.css'
import { connect } from 'react-redux'

const mapStateToProps = state => {
    return {
        creds: state.creds
    }
}

const DisconnectedApp = ({ creds }) => {
    if (!(creds.user && creds.pwd)) {
        return (
            <div className="container">
                <Header/>

                <div className="left box">
                <LoginForm/>
                </div>
                <Footer/>
            </div>
        )
    } else {
        return (
            <div className="container">
                <Header/>

                <MainPage/>

            </div>
        )
    }
}

const App = connect(mapStateToProps)(DisconnectedApp)

export default App

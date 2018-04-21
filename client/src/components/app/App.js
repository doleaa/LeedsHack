import React from 'react'
import Header from './../header/Header'
import MainPage from './../mainPage/MainPage'
import Footer from './../footer/Footer'
import './App.css'
import { connect } from 'react-redux'

const mapStateToProps = state => {
    return {
        searchType: state.searchType,
        response: state.response
    }
};

const DisconnectedApp = ({ searchType, response }) => {
    return (
        <div className="container">

            <Header/>

            <MainPage/>

            <Footer/>

        </div>
    )
};

const App = connect(mapStateToProps)(DisconnectedApp);

export default App

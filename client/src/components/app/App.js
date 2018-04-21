import React from 'react'
import Header from './../header/Header'
import MainPage from './../mainPage/MainPage'
import SearchGroup from './../search/SearchGroup'
import SearchSingle from './../search/SearchSingle'
import FlightsList from './../flightDisplay/FlightsList'
import Footer from './../footer/Footer'
import LocationChoice from './../locationchoice/LocationChoice'
import './App.css'
import { connect } from 'react-redux'

const mapStateToProps = state => {
    return {
        searchType: state.searchType,
        response: state.response
    }
}

const DisconnectedApp = ({ searchType, response }) => {
    return (
        <div className="container">

            <Header/>

            <MainPage/>

            <Footer/>

        </div>
    )

    if (searchType === "single" && response instanceof Array) {
        return (
            <div className="container">

                <Header/>

                <FlightsList
                    offerList={ response }
                />

                <Footer/>

            </div>
        )
    }

    if (searchType === "single") {
        return (
            <div className="container">

                <Header/>

                <SearchSingle/>

                <Footer/>

            </div>
        )
    }

    if (searchType === "group") {
        return (
            <div className="container">

                <Header/>

                <LocationChoice/>

                <Footer/>

            </div>
        )
    }

}

const App = connect(mapStateToProps)(DisconnectedApp)

export default App

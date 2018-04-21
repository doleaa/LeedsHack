import React from 'react'
import PropTypes from 'prop-types'
import './FlightDisplay.css'

const FlightDisplay = ({ outFrom, outTo, outAirline, inFrom, inTo, inAirline, price }) => (


    <div className="row overlay box1">

            <div className="col-md-4 down">From: <h6>{outFrom}</h6></div>
            <div className="col-md-4 down">
                <h6>{outAirline}</h6>
            </div>
            <div className="col-md-4 down">To: <h6>{outTo}</h6></div>

            <div className="col-md-4 down">From: <h6>{inFrom}</h6></div>
            <div className="col-md-4 down">
                <h6>{inAirline}</h6>
            </div>
            <div className="col-md-4 down">To: <h6>{inTo}</h6></div>

            <div className="col-md-8 down">Deals from <h6>&pound;{price}</h6></div>
            <div className="col-md-4 down"><br/><p className="btn">Select</p></div>
    </div>
)


FlightDisplay.propTypes = {
    outFrom: PropTypes.string,
    outTo: PropTypes.string,
    inFrom: PropTypes.string,
    inTo: PropTypes.string,
    price: PropTypes.number,
    inAirline: PropTypes.string,
    outAirline: PropTypes.string
}

export default FlightDisplay
import React from 'react'
import PropTypes from 'prop-types'
import FlightDisplay from './FlightDisplay'

const FlightsList = ({ offerList }) => (
    <div>
        {offerList.map(item => (
            <FlightDisplay
                key={ item.outboundLeg.from + item.returnLeg.from + item.price }
                outFrom={ item.outboundLeg.from }
                outTo={ item.outboundLeg.to }
                outAirline={ item.outboundLeg.airline }
                inFrom={ item.returnLeg.from }
                inTo={ item.returnLeg.to }
                inAirline={ item.returnLeg.airline }
                price={ item.totalPrice }
            />
        ))}
    </div>
)

FlightsList.propTypes = {
    offerList: PropTypes.array.isRequired
}

export default FlightsList
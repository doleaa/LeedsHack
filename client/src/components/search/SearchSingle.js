import React from 'react'
import './SearchSingle.css'
import { Typeahead } from 'react-bootstrap-typeahead'
import { Months } from './optionsMonth'
import { Years } from './optionsYear'
import Select from 'react-select'
import { connect } from 'react-redux'
import { setOrigin, setDestination, setMonth, setYear, searchOffers } from './../../actions'
import 'react-select/dist/react-select.css'

const mapStateToProps = state => {
    return {
        formBody: state.searchSingle
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setOrigin: origin => { dispatch(setOrigin(origin)) },
        setDestination: destination => { dispatch(setDestination(destination)) },
        setMonth: month => { dispatch(setMonth(month)) },
        setYear: year => { dispatch(setYear(year)) },
        searchOffers: formBody => { dispatch(searchOffers(formBody)) }
    }
}

const DisconnectedSearchSingle = ({ formBody, setOrigin, setDestination, setMonth, setYear, searchOffers }) => {
    const handleOrigin = event => setOrigin(event.target.value)
    const handleDestination = event => setDestination(event.target.value)
    const handleMonth = value => setMonth(value)
    const handleYear = value => setYear(value)
    const denyBrowser = event => {event.preventDefault()}

    return (
        <form className="row overlay box1" onSubmit={denyBrowser}>
             <div className="inside">
                        <div className="col-md-3">
                  <label>Origin</label>
                  <p><input type="text" value={formBody.origin} onChange={handleOrigin} className="form-origin inputFields" placeholder="Country, city or airport"/></p>
                </div>
                <div className="col-md-3">
                  <label>Destination</label>
                  <p><input type="text" value={formBody.destination} onChange={handleDestination} className="form-destination inputFields" placeholder="Country, city or airport"/></p>
                </div>

                <div className="col-md-2">
                  <label>Month</label>
                  <Select name="form-field-name" value={formBody.month} onChange={handleMonth} className="form-month inputFields" placeholder="Select month" options={Months}/>
                </div>
                <div className="col-md-2">
                  <label>Year</label>
                  <Select name="form-field-name" value={formBody.year} onChange={handleYear} className="form-years inputFields" placeholder="Select year" options={Years}/>
                </div>

                <div className="col-md-2">
                  <label></label>
                  <p><button className="form-button swing inputFields" onClick={() => searchOffers(formBody)}>Search</button></p>
                </div>
              </div>
        </form>
    )
}

const SearchSingle = connect(mapStateToProps, mapDispatchToProps)(DisconnectedSearchSingle)

export default SearchSingle
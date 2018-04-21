import React from 'react'
import './SearchGroup.css'
import { Typeahead } from 'react-bootstrap-typeahead'
import { Months } from './optionsMonth'
import { Years } from './optionsYear'
import Select from 'react-select'
import 'react-select/dist/react-select.css'


const SearchGroup = () => (




    <form className="row overlay box1">
         <div className="inside">
                    <div className="col-md-3">
              <label>Origin</label>
              <p><input type="text" className="form-origin inputFields" placeholder="Country, city or airport"/></p>
            </div>
            <div className="col-md-3">
              <label>Destination</label>
              <p><input type="text" className="form-destination inputFields" placeholder="Country, city or airport"/></p>
            </div>

            <div className="col-md-2">
              <label>Month</label>
              <Select name="form-field-name" className="form-month inputFields" placeholder="Select month" options={Months}/>
            </div>
            <div className="col-md-1">
              <label>Year</label>
              <Select name="form-field-name" className="form-years inputFields" placeholder="Select year" options={Years}/>
            </div>
            <div className="col-md-1">
              <label className="form-passengers">Passengers</label>
              <p><input type="text" className="form-passengers inputFields" placeholder="1"/></p>
            </div>
            <div className="col-md-2">
              <label></label>
              <p><button type="submit" className="form-button inputFields">Search</button></p>
            </div>
          </div>
    </form>

)

export default SearchGroup
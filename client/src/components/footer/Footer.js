import React from 'react'
import './Footer.css'
import logoSkyscanner from './../../img/skyscannerlogo.png';


const Footer = () => (
    <div className="row">
      <div className="col-md-12">
        <h3>
            <img className="logoSkyscanner" src={logoSkyscanner} alt="Powered by Skyscanner"/>
        </h3>
      </div>
    </div>
)

export default Footer
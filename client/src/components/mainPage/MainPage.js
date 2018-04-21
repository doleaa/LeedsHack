import React from 'react'
import './MainPage.css'
import { connect } from 'react-redux'

const mapDispatchToProps = dispatch => {
    return {}
};

const DisconnectedMainPage = ({}) => (
    <div className="row-xs-12">
      <div className="col-xs-12 box left" onClick={() => {}}></div>
    </div>
);

const MainPage = connect(null, mapDispatchToProps)(DisconnectedMainPage);

export default MainPage
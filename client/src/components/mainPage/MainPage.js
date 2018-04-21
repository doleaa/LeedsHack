import React from 'react'
import './MainPage.css'
import { setSearchType } from './../../actions'
import { connect } from 'react-redux'

const mapDispatchToProps = dispatch => {
    return {
        setSearchType: searchType => {
            dispatch(setSearchType(searchType))
        }
    }
};

const DisconnectedMainPage = ({ setSearchType }) => (
    <div className="row-xs-12">
      <div className="col-xs-12 box left" onClick={() => setSearchType("single")}></div>
    </div>
);

const MainPage = connect(null, mapDispatchToProps)(DisconnectedMainPage);

export default MainPage
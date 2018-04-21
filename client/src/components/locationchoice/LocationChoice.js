import React from 'react'
import './LocationChoice.css'
import { connect } from 'react-redux'
import SearchGroup from './../search/SearchGroup'
import { setGroupType } from './../../actions'


const mapStateToProps = state => {
    return {
        groupType: state.groupType
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setGroupType: groupType => {
            dispatch(setGroupType(groupType))
        }
    }
}

const DisconnectedLocationChoice = ({ groupType, setGroupType }) => {
    if (groupType === "") {
        return (
            <div className="row">
              <div className="col-md-4 box left1" onClick={() => setGroupType("sameDep")}><h5>Same departure&nbsp;&nbsp;</h5></div>
              <div className="col-md-4 box middle1" ><h5>Different departure &nbsp;&nbsp; </h5></div>
              <div className="col-md-4 box right1" ><h5>Group gathering  &nbsp; </h5></div>
            </div>
        )
    }

    if (groupType === "sameDep") {
        return ( <SearchGroup/> )
    }
}

const LocationChoice = connect(mapStateToProps, mapDispatchToProps)(DisconnectedLocationChoice)

export default LocationChoice
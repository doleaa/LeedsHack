import { combineReducers } from 'redux'
import searchType from './searchType'
import response from './response'
import groupType from './groupType'
import searchSingle from './searchSingle'

const greatUniApp = combineReducers({ searchType, response, groupType, searchSingle})

export default greatUniApp
import { combineReducers } from 'redux'
import creds from './creds'
import login from './login'

const ourApp = combineReducers({ creds, login })

export default ourApp
import { combineReducers } from 'redux'
import creds from './creds'
import login from './login'
import songs from './songs'

const ourApp = combineReducers({ creds, login, songs })

export default ourApp
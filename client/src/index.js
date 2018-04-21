import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/app/App'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import greatUniApp from './reducers'

const loggerMiddleware = createLogger()

let store = createStore(
    greatUniApp,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    )
)

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)

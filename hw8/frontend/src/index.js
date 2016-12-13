require('expose?$!expose?jQuery!jquery')
//require("bootstrap-webpack")
require('./styles.css')

import React from 'react'
import { render } from 'react-dom'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import createLogger from 'redux-logger'
import { createStore, applyMiddleware, compose } from 'redux'

import Reducer from './reducers'
import App from './components/app'

import {init} from './components/auth/authActions'

const logger = createLogger()
const store = createStore(Reducer, applyMiddleware(thunk, logger))

store.dispatch(init())

render(
    <Provider store={store}>
        <App title='My Social App'/>
    </Provider>,
    document.getElementById('app')
)

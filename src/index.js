import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'

import App from './containers/App'
import appReducer from './reducers/appReducer'
import fetchMiddleware from './middleware/middleware'
import './index.css'

let store = createStore(appReducer, applyMiddleware(fetchMiddleware));

ReactDOM.render(
  <Provider store={store}>
  <App/>
</Provider >, document.getElementById('root'));

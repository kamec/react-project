import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import App from './containers/App'
import appReducer from './reducers/appReducer'

import './index.css'

let store = createStore(appReducer);

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider >,
  document.getElementById('root')
);

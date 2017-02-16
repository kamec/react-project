import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import thunk  from 'redux-thunk'
import {createStore, applyMiddleware} from 'redux'

import App from './containers/App'
import reducer from './reducers/reducer'
import './index.css'

let store = createStore(reducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}> // делает стор доступным дочерним компонентам
    <App/>
  </Provider >,
  document.getElementById('root'));

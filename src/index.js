import React from 'react' // точки с запятыми как вариант конечно
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import thunk  from 'redux-thunk'
import {createStore, applyMiddleware} from 'redux'

import App from './containers/App'
import reducer from './reducers/reducer'
import './index.css'

let store = createStore(reducer, applyMiddleware(thunk)); // why let?

// делает стор доступным дочерним компонентам
ReactDOM.render(
  <Provider store={store}> 
    <App/>
  </Provider >,
  document.getElementById('root'));

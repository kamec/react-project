import {combineReducers} from 'redux'
import markers from './markers'
import weatherData from './weatherData'

const mapApp = combineReducers({
  markers,
  weatherData
})

export default mapApp;

import {combineReducers} from 'redux'
import markers from './markers'
import quakesData from './quakesData'

const reducer = combineReducers({
  markers,
  quakesData
})

export default reducer;

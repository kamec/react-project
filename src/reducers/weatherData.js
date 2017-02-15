import * as types from '../constants/constants'

class WeatherData {
  constructor(id) {
    this.isFetching = false;
    this.didInvalidate = false;
    this.lastUpdate = 0;
    this.weatherData = {};
  }
}

const getNextId = state => state.reduce((maxId, data) => Math.max(data.id, maxId), -1) + 1;

const initialState = [new WeatherData(0), new WeatherData(1)];

function weatherData(state = initialState, action) {
  const payload = action.payload;
  switch (action.type) {
    case types.ADD_MARKER:
      return [...state, new WeatherData(getNextId(state))];
    case types.REMOVE_MARKER:
      return state.filter(data => data.id !== payload.id);



    case types.REQEST_WEATHER_DATA:
      return

    case types.FETCH_WEATHER_DATA:
      return state.map(data => {
        if (data.id === payload.id) {
          return Object.assign({}, data, {
            fetchNeeded: false,
            weatherData: payload.weatherData
          })
        }
        return data
      })

    default:
      return state;
  }
}

export default weatherData;

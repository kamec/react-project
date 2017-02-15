import * as types from '../constants/constants'

const extractWeatherData = response => ({
  weather: response.weather.pop(),
  cloudsPercentage: response.clouds.all,
  wind: response.wind,
  main: response.main
})

export const requestWeatherData = (marker) => ({
  type: types.REQEST_WEATHER_DATA,
  payload: {
    marker,
  },
})

export const receiveWeatherData = (marker, json) => ({
  type: types.RECEIVE_WEATHER_DATA,
  payload: {
    marker,
    weatherData: extractWeatherData(json),
    receivedAt: Date.now(),
  },
})

export const requestEarthquakeData = (marker) => ({
  type: types.REQUEST_EARTHQUAKES_DATA,
  payload: {
    marker,
  },
})

export const reseiveEarthquakeData = (marker, json) => ({
  type: types.RECEIVE_EARTHQUAKES_DATA,
  payload: {
    marker,
    nearestQuakes: json,
    receivedAt: Date.now(),
  },
})

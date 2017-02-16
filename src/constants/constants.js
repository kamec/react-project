export const ADD_MARKER = 'ADD_MARKER'
export const EDIT_MARKER_NAME = 'EDIT_MARKER_NAME'
export const EDIT_MARKER_COORDS = 'EDIT_MARKER_COORDS'
export const REMOVE_MARKER = 'REMOVE_MARKER'
export const TOGGLE_MARKER = 'TOGGLE_MARKER'
export const TOGGLE_ALL_MARKERS = 'TOGGLE_ALL_MARKERS'

export const INVALIDATE_DATA = 'INVALIDATE_DATA'

export const RECEIVE_WEATHER_DATA = 'RECEIVE_WEATHER_DATA'
export const REQEST_WEATHER_DATA = 'REQEST_WEATHER_DATA'

export const RECEIVE_EARTHQUAKES_DATA = 'RECEIVE_EARTHQUAKES_DATA'
export const REQUEST_EARTHQUAKES_DATA = 'REQUEST_EARTHQUAKES_DATA'

const WEATHER_APIID = '17bf657cd96dfce1a5e3f311097178e3'
export const WEATHER_URL = (lat, lon) => `http://api.openweathermap.org/data/2.5/weather?units=metric&APPID=${WEATHER_APIID}&lat=${lat}&lon=${lon}`;
export const EARTQUAKE_URL = (lat, lon, radius = 5) => `http://www.seismicportal.eu/fdsnws/event/1/query?format=json&limit=5&lat=${lat}&lon=${lon}&maxradius=${radius}`;

export const MAP_CONFIG = {
  zoom: 1,
  center: {
    lat: 0.0,
    lng: 0.0
  },
  mapTypeControl: false,
  streetViewControl: false
}

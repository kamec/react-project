export const ADD_MARKER = 'ADD_MARKER'
export const EDIT_MARKER_NAME = 'EDIT_MARKER_NAME'
export const EDIT_MARKER_COORDS = 'EDIT_MARKER_COORDS'
export const REMOVE_MARKER = 'REMOVE_MARKER'
export const TOGGLE_MARKER = 'TOGGLE_MARKER'
export const TOGGLE_ALL_MARKERS = 'TOGGLE_ALL_MARKERS'
export const FETCH_DATA = 'FETCH_DATA'

export const WEATHER_URL = (lat, lon) => `http://api.openweathermap.org/data/2.5/weather?units=metric&APPID=17bf657cd96dfce1a5e3f311097178e3&lat=${lat}&lon=${lon}`;

export const MAP_CONFIG = {
  zoom: 1,
  center: {
    lat: 0.0,
    lng: 0.0
  },
  mapTypeControl: false,
  streetViewControl: false
}

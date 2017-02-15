import * as types from '../constants/ActionTypes'

const markersInitialState = [{
  id: 0,
  name: 'Hello',
  position: {
    lat: 25.0,
    lng: 25.0
  },
  checked: true,
}, {
  id: 1,
  name: 'World',
  position: {
    lat: 50.0,
    lng: 50.0
  },
  checked: false,
}];

function markers(state = markersInitialState, action) {
  const payload = action.payload;
  switch (action.type) {
    case types.ADD_MARKER:
      console.log(payload.weatherData);
      const { name, position, checked } = payload.marker;
      return [...state, {
        id: state.reduce((maxId, marker) => Math.max(marker.id, maxId), -1) + 1,
        name,
        position,
        checked,
        weatherData: payload.weatherData
      }]

    case types.REMOVE_MARKER:
      return state.filter(marker => marker.id !== payload.id)

    case types.EDIT_MARKER_COORDS:
    case types.EDIT_MARKER_NAME:
      return state.map(marker => marker.id === payload.marker.id ? Object.assign({}, marker, payload.marker) : marker)

    case types.TOGGLE_MARKER:
      return state.map(marker => {
        if (marker.id === payload.id) {
          return Object.assign({}, marker, {
            checked: !marker.checked
          })
        }
        return marker
      })

    default:
      return state
  }
}

export default markers;

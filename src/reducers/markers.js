import MarkerActionTypes from '../actions/MarkerActionTypes';

const markersInitialState = [{
  name: 'Hello',
  coords: {
    lat: 25.0,
    lng: 25.0
  },
  checked: true,
}, {
  name: 'World',
  coords: {
    lat: 50.0,
    lng: 50.0
  },
  checked: false,
}];

function markers(state = markersInitialState, action) {
  switch (action.type) {
    case MarkerActionTypes.ADD_MARKER:
      return [...state, action.payload.marker];

    case MarkerActionTypes.TOGGLE_MARKER:
      return state.map((marker, id) => {
        if (id === action.payload.id) {
          return Object.assign({}, marker, {
            checked: !marker.checked
          })
        }
        return marker;
      })
    default:
      return state;
  }
}

export default markers;

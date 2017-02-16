import * as types from '../constants/constants'

class Marker {
  constructor(id, name, position, checked) {
    this.id = id;
    this.name = name;
    this.position = position;
    this.checked = checked;
  }
}

const initialState = [
  new Marker(0, 'Hello', {lat: 25, lng: 25}, true),
  new Marker(1, 'World', {lat: 50, lng: 50}, false),
];

const getNextId = state =>  state.reduce((maxId, marker) => Math.max(marker.id, maxId), -1) + 1;

function markers(state = initialState, action) {
  const payload = action.payload;
  switch (action.type) {
    case types.ADD_MARKER:
      const { name, position, checked } = payload.marker;
      return [...state, new Marker(getNextId(state), name, position, checked)]

    case types.REMOVE_MARKER:
      return state.filter(marker => marker.id !== payload.id)

    case types.EDIT_MARKER_COORDS:
    case types.EDIT_MARKER_NAME:
      return state.map(marker => (marker.id === payload.marker.id) ? Object.assign({}, marker, payload.marker) : marker)

    case types.TOGGLE_MARKER:
      return state.map(marker => (marker.id === payload.id) ? Object.assign({}, marker, { checked: !marker.checked }) : marker)

    default:
      return state
  }
}

export default markers;

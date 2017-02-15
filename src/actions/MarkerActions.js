import * as types from '../constants/constants'

export const addMarker = (marker) => ({
  type: types.ADD_MARKER,
  payload: {
    marker,
  },
})

export const removeMarker = (id) => ({
  type: types.REMOVE_MARKER,
  payload: {
    id,
  },
})

export const toggleMarker = (id) => ({
  type: types.TOGGLE_MARKER,
  payload: {
    id,
  },
})

export const editMarkerName = (id, marker) => ({
  type: types.EDIT_MARKER_NAME,
  payload: {
    id,
    marker,
  },
})

export const editMarkerCoords = (id, marker, url) => ({
  type: types.EDIT_MARKER_COORDS,
  payload: {
    id,
    marker,
  },
})

export const toggleAllMarkers = () => ({
  type: types.TOGGLE_ALL_MARKERS,
  payload: {},
})

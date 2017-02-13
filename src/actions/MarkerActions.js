import * as types from '../constants/ActionTypes'

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

export const editMarker = (id, marker) => ({
  type: types.EDIT_MARKER,
  payload: {
    id,
    marker,
  },
})

export const startEditMarker = (id) => ({
  type: types.START_EDIT_MARKER,
  payload: {
    id,
  },
})

export const toggleAllMarkers = () => ({
  type: types.TOGGLE_ALL_MARKERS,
  payload: {},
})

export const stopEditMarker = () => ({
  type: types.STOP_EDIT_MARKER,
  payload: {},
})

import * as types from '../constants/constants'
import { EARTQUAKE_URL } from '../constants/constants'

export const invalidateData = marker => ({
  type: types.INVALIDATE_DATA,
  payload: {
    marker
  }
})

export const requestQuakesData = (marker) => ({
  type: types.REQUEST_EARTHQUAKES_DATA,
  payload: {
    marker,
  },
})

export const receiveQuakesData = (marker, json, status) => ({
  type: types.RECEIVE_EARTHQUAKES_DATA,
  status,
  payload: {
    marker,
    quakesData: json,
    receivedAt: Date.now(),
  },
})

const fetchQuakesData = (marker) => (dispatch) => {
  dispatch(requestQuakesData(marker));
  return fetch(EARTQUAKE_URL(marker.position.lat, marker.position.lng))
    .then(rawResponse => {
      if (rawResponse.status === 200) {
        return rawResponse.json()
      }
      throw new Error(rawResponse.status + ' : ' + rawResponse.statusText)
    })
    .then(json => dispatch(receiveQuakesData(marker, json, 'succsess')))
    .catch(error => dispatch(receiveQuakesData(marker, {}, 'failed')));
}

const shouldFetchData = (state, marker) => {
  const data = state.quakesData.find(data => data.id === marker.id);
  if (data.didInvalidate) {
    return true
  }

  return false
}

export const fetchDataIfNeeded = marker => (dispatch, getState) => {
  if (shouldFetchData(getState(), marker)) {
    dispatch(fetchQuakesData(marker))
  }
}

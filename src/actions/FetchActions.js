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

export const receiveQuakesData = (marker, json) => ({
  type: types.RECEIVE_EARTHQUAKES_DATA,
  payload: {
    marker,
    quakesData: json,
    receivedAt: Date.now(),
  },
})

const fetchQuakesData = (marker) => (dispatch) => {
  dispatch(requestQuakesData(marker));
  return fetch(EARTQUAKE_URL(marker.position.lat, marker.position.lng))
    .then(rawResponse => rawResponse.json())
    .then(json => dispatch(receiveQuakesData(marker, json)));
}

const HOUR = 3600 * 1000;

const tooFrequent = (lastUpdate) => (Date.now() - lastUpdate) < HOUR;

const shouldFetchData = (state, marker) => {
  const data = state.quakesData.find(data => data.id === marker.id);
  if (data.didInvalidate && !data.isFetching) {
    return true
  }

  if (data.isFetching || tooFrequent(data.lastUpdate)) {
    return false
  }

  return false
}

export const fetchDataIfNeeded = marker => (dispatch, getState) => {
  if (shouldFetchData(getState(), marker)) {
    dispatch(fetchQuakesData(marker))
  }
}

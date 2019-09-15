import * as types from '../constants/constants';

export const invalidateData = marker => ({ 
  type: types.INVALIDATE_DATA,
  payload: {
    marker
  }
})

export const requestQuakesData = marker => ({
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
  return fetch(types.EARTQUAKE_URL(marker.position.lat, marker.position.lng))
    .then(rawResponse => { 
      if (rawResponse.status === 200) { 
        return rawResponse.json()
      }
      throw new Error()
    })
    .then(json => dispatch(receiveQuakesData(marker, json, 'succsess')))
    .catch(() => dispatch(receiveQuakesData(marker, {}, 'failed')));
}

const shouldFetchData = (state, marker) => {
  const data = state.quakesData.find(({id}) => id === marker.id);
  return data.didInvalidate;
}

export const fetchDataIfNeeded = marker => (dispatch, getState) => {
  if (shouldFetchData(getState(), marker)) {
    dispatch(fetchQuakesData(marker))
  }
}

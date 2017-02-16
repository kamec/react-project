import * as types from '../constants/constants'
import { EARTQUAKE_URL } from '../constants/constants'

export const invalidateData = marker => ({ // нужно обновить
  type: types.INVALIDATE_DATA,
  payload: {
    marker
  }
})

export const requestQuakesData = marker => ({ // в процессе обновления
  type: types.REQUEST_EARTHQUAKES_DATA,
  payload: {
    marker,
  },
})

export const receiveQuakesData = (marker, json, status) => ({ // обновлено
  type: types.RECEIVE_EARTHQUAKES_DATA,
  status,
  payload: {
    marker,
    quakesData: json,
    receivedAt: Date.now(),
  },
})

const fetchQuakesData = (marker) => (dispatch) => { // то, что в thunk - произвести запрос
  dispatch(requestQuakesData(marker)); //переводит state в состояние обновления данных
  return fetch(EARTQUAKE_URL(marker.position.lat, marker.position.lng))
    .then(rawResponse => { // http-ответ
      if (rawResponse.status === 200) { // статус ок
        return rawResponse.json()
      }
      throw new Error()
    })
    .then(json => dispatch(receiveQuakesData(marker, json, 'succsess')))
    .catch(error => dispatch(receiveQuakesData(marker, {}, 'failed')));
}

const shouldFetchData = (state, marker) => {
  const data = state.quakesData.find(data => data.id === marker.id);
  return data.didInvalidate;
}

export const fetchDataIfNeeded = marker => (dispatch, getState) => {
  if (shouldFetchData(getState(), marker)) {
    dispatch(fetchQuakesData(marker))
  }
}

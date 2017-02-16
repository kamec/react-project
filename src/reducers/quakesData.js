import * as types from '../constants/constants'

class QuakesData {
  constructor(id) {
    this.id = id;
    this.didInvalidate = true;
    this.isFetching = false;
    this.lastUpdate = 0;
    this.quakesData = {};
  }
}

const getNextId = state => state.reduce((maxId, data) => Math.max(data.id, maxId), -1) + 1;

const initialState = [new QuakesData(0), new QuakesData(1)];

function quakesData(state = initialState, action) {
  const payload = action.payload;
  switch (action.type) {
    case types.INVALIDATE_DATA:
      return state.map(data => (data.id === payload.marker.id) ? Object.assign({}, data, {
        didInvalidate: true
      }) : data);

    case types.REQUEST_EARTHQUAKES_DATA:
      return state.map(data => (data.id === payload.marker.id) ? Object.assign({}, data, {
        isFetching: true,
        didInvalidate: false
      }) : data);

    case types.RECEIVE_EARTHQUAKES_DATA:
      return state.map(data => (data.id === payload.marker.id) ? Object.assign({}, data, {
        isFetching: false,
        lastUpdate: payload.receivedAt,
        quakesData: payload.quakesData
      }) : data);

    case types.ADD_MARKER:
      return [...state, new QuakesData(getNextId(state))];

    case types.REMOVE_MARKER:
      return state.filter(data => data.id !== payload.id);

    default:
      return state;
  }
}

export default quakesData;

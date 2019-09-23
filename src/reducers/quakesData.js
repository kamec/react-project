import * as types from '../constants/constants';

class QuakesData {
  constructor(id) {
    this.id = id;
    this.didInvalidate = true; // нужно ли загрузить новые данные
    this.isFetching = false; // в процессе обновления
    this.lastUpdate = 0;
    this.quakesData = {}; // данные
  }
}


const HOUR = 3600 * 1000;

const tooFrequent = (lastUpdate) => (Date.now() - lastUpdate) < HOUR; // слишком часто

const getNextId = state => state.reduce((maxId, data) => Math.max(data.id, maxId), -1) + 1;

const initialState = [new QuakesData(0), new QuakesData(1)];

function quakesData(state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case types.INVALIDATE_DATA:
      return state.map(data => (data.id === payload.marker.id) ? ({
        ...data,
        didInvalidate: !data.isFetching && !tooFrequent(data.lastUpdate)
      }) : data);

    case types.REQUEST_EARTHQUAKES_DATA: // запрос
      return state.map(data => (data.id === payload.marker.id) ? ({
        ...data,
        isFetching: true,
        didInvalidate: false
      }) : data);

    case types.RECEIVE_EARTHQUAKES_DATA: // получение
      if (action.status === 'succsess') {
        return state.map(data => (data.id === payload.marker.id) ? ({
          ...data,
          isFetching: false,
          lastUpdate: payload.receivedAt,
          quakesData: payload.quakesData
        }) : data);
      }
      return state.map(data => (data.id === payload.marker.id) ? ({
        ...data,
        didInvalidate: true,
        isFetching: false,
        quakesData: payload.quakesData
      }) : data);

    case types.ADD_MARKER:
      return [...state, new QuakesData(getNextId(state))];

    case types.REMOVE_MARKER:
      return state.filter(data => data.id !== payload.id);

    case types.EDIT_MARKER_COORDS:
      return state.map(data => (data.id === payload.marker.id) ? ({...data, 
        didInvalidate: true
      }) : data);


    default:
      return state;
  }
}

export default quakesData;

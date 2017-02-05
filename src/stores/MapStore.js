import Immutable from 'immutable';
import {ReduceStore} from 'flux/utils';
import AppDispatcher from '../dispatcher/AppDispatcher';

import ListActionTypes from '../actions/ListActionTypes';
import Marker from '../entities/Marker';

class MapStore extends ReduceStore {

  constructor() {
    super(AppDispatcher);
  }

  getInitialState() {
    return Immutable.OrderedMap();
  }

  reduce(state, action) {
    switch (action.type) {
      case ListActionTypes.ADD_MARKER:
        const id = Date.now();
        const {name, lat, lng} = action.marker;
        return state.set(id, new Marker({id, name, lat, lng}));

      case ListActionTypes.REMOVE_MARKER:
        return state.delete(action.id);
      default:
        return state;

    }
  }

  addChangeListener(callback) { //subscribe
    this.on('CHANGED', callback);
  }

  removeChangeListener(callback) {
    this.removeListener('CHANGED', callback);
  }

  toggleMarker(marker) {
    this.marker = marker;
  }

}

export default new MapStore();

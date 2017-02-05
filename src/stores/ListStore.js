import Immutable from 'immutable';
import {ReduceStore} from 'flux/utils';

import AppDispatcher from '../dispatcher/AppDispatcher';
import ListActionTypes from '../actions/ListActionTypes';
import Marker from '../entities/Marker';

class ListStore extends ReduceStore {

  constructor() {
    super(AppDispatcher);
  }

  getInitialState() {
    return Immutable.OrderedMap()
    .set(0, new Marker({id: 0, name: 'Hello', lat: 25.0, lng: 131.0, chosen: false}))
    .set(1, new Marker({id: 1, name: 'World', lat: 50.0, lng: 50.0, chosen: true}));
  }

  reduce(state, action) {
    switch (action.type) {
      case ListActionTypes.ADD_MARKER:
        const id = Date.now();
        const {name, lat, lng} = action.marker;
        const chosen = false;
        return state.set(id, new Marker({id, name, lat, lng, chosen}));

      case ListActionTypes.REMOVE_MARKER:
        return state.delete(action.id);

      case ListActionTypes.TOGGLE_MARKER:
        return state.update(
          action.id,
          marker => marker.set('chosen', !marker.chosen),
        );

      default:
        return state;
    }
  }
}

export default new ListStore();

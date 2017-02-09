import {ReduceStore} from 'flux/utils';

import AppDispatcher from '../dispatcher/AppDispatcher';
import MarkerActionTypes from '../actions/MarkerActionTypes';

class MarkerEditStore extends ReduceStore {
  constructor() {
    super(AppDispatcher);
  }

  getInitialState() {
    return '';
  }

  reduce(state, action) {
    switch (action.type) {
      case MarkerActionTypes.START_EDIT_MARKER:
        return action.id;

      case MarkerActionTypes.STOP_EDIT_MARKER:
        return '';

      default:
        return state;
    }
  }
}

export default new MarkerEditStore();

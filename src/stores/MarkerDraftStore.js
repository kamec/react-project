import {ReduceStore} from 'flux/utils';

import AppDispatcher from '../dispatcher/AppDispatcher';
import MarkerActionTypes from '../actions/MarkerActionTypes';

class MarkerDraftStore extends ReduceStore {
  constructor() {
    super(AppDispatcher);
  }

  getInitialState() {
    return '';
  }

  reduce(state, action) {
    switch (action.type) {
      case MarkerActionTypes.ADD_MARKER:
        return '';

      case MarkerActionTypes.UPDATE_MARKER_DRAFT:
        return action.marker;

      default:
        return state;
    }
  }
}

export default new MarkerDraftStore();

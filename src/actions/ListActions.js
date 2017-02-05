import ListActionTypes from './ListActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';

const Actions = {
  addMarker(marker) {
    AppDispatcher.dispatch({type: ListActionTypes.ADD_MARKER, marker});
  },

  removeMarker(id) {
    AppDispatcher.dispatch({type: ListActionTypes.REMOVE_MARKER, id})
  },

  toggleMarker(id) {
    AppDispatcher.dispatch({type: ListActionTypes.TOGGLE_MARKER, id})
  },

  editMarker(id, name, lat, lng) {
    AppDispatcher.dispatch({type: ListActionTypes.EDIT_MARKER, id, name, lat, lng})
  }
};

export default Actions;

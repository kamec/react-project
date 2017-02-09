import MarkerActionTypes from './MarkerActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';

const Actions = {
  addMarker(marker) {
    console.log(marker);
    AppDispatcher.dispatch({ type: MarkerActionTypes.ADD_MARKER, marker });
  },

  removeMarker(id) {
    AppDispatcher.dispatch({ type: MarkerActionTypes.REMOVE_MARKER, id });
  },

  toggleMarker(id) {
    AppDispatcher.dispatch({ type: MarkerActionTypes.TOGGLE_MARKER, id });
  },

  editMarker(marker) {
    AppDispatcher.dispatch({ type: MarkerActionTypes.EDIT_MARKER, marker });
  },

  updateMarkerDraft(marker) {
    AppDispatcher.dispatch({ type: MarkerActionTypes.UPDATE_MARKER_DRAFT, marker });
  },

  startEditMarker(id) {
    AppDispatcher.dispatch({ type: MarkerActionTypes.START_EDIT_MARKER, id, });
  },

  stopEditMarker() {
    AppDispatcher.dispatch({ type: MarkerActionTypes.STOP_EDIT_MARKER, });
  },
};

export default Actions;

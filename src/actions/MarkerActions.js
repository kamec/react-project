import MarkerActionTypes from './MarkerActionTypes';

let nextMarkerId = 0;

const Actions = {
  addMarker: (marker) => {
    return {
      type: MarkerActionTypes.ADD_MARKER,
      payload: {
        id: nextMarkerId++,
        marker,
      },
    }
  },

  removeMarker: (id) => {
    return {
      type: MarkerActionTypes.REMOVE_MARKER,
      payload: {
        id,
      },
    }
  },

  toggleMarker: (id) => {
    return {
      type: MarkerActionTypes.TOGGLE_MARKER,
      payload: {
        id,
      },
    }
  },

  editMarker: (id, name) => {
    return {
      type: MarkerActionTypes.EDIT_MARKER,
      payload: {
        id,
        name,
      },
    }
  },

  updateMarkerDraft: (marker) => {
    return {
      type: MarkerActionTypes.UPDATE_MARKER_DRAFT,
      payload: {
        marker,
      }
    }
  },

  startEditMarker: (id) => {
    return {
      type: MarkerActionTypes.START_EDIT_MARKER,
      payload: {
        id,
      },
    }
  },

  stopEditMarker: () => {
    return {
      type: MarkerActionTypes.STOP_EDIT_MARKER,
      payload: {},
    }
  }
}

export default Actions;

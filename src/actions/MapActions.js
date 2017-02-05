import AppDispatcher from '../dispatcher/AppDispatcher';

export default {
  setMarkerOnMap(latitude, longitude) {
    AppDispatcher.dispatch({
      actionType: 'MAP_CHANGED',
      marker: {
        latitude,
        longitude
      }
    });
  }
}

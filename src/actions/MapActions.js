import AppDispatcher from '../dispatcher/AppDispatcher';

export default {

  setMarkerOnMap(lat, lng) {
    AppDispatcher.dispatch({
      actionType: 'MAP_CHANGED',
      marker: {
        lat,
        lng
      }
    });
  }
}

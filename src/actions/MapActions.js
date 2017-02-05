import AppDispatcher from '../dispatcher/AppDispatcher';

export default {

  setMarkerOnMap(item) {
    AppDispatcher.dispatch({
      actionType: 'MAP_CHANGED',
      marker: {
        name: item.name,
        lat: item.lat,
        lng: item.lng
      }
    });
  }
}

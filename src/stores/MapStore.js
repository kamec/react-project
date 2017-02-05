import {EventEmitter} from 'events';
import AppDispatcher from '../dispatcher/AppDispatcher';

class MapStore extends EventEmitter {
  constructor(...args) {
    super(...args);
    this.marker = null;
  }

  addChangeListener(callback) {
    this.on('CHANGED', callback);
  }

  removeChangeListener(callback) {
    this.removeListener('CHANGED', callback);
  }

  setMarker(marker) {
    this.marker = marker;
  }
}


let store = new MapStore();
store.dispatchToken = AppDispatcher.register(action => {
    switch (action.actionType) {
    case 'MAP_CHANGED':
      store.setMarker(action.marker);
      store.emit('CHANGED');
      break;
    default:
      break;
    }
});

export default store;

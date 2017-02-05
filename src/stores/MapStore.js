import {EventEmitter} from 'events';
import AppDispatcher from '../dispatcher/AppDispatcher';

class MapStore extends EventEmitter {
  constructor(...args) {
    super(...args);
    this.marker = null;
  }

  subscribe(callback) {
    this.on('CHANGED', callback);
  }

  unsubscribe(callback) {
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
    case 'CHANGED':
      console.log('GUYS, GUYS... CHANGED!!11');
      break;
    default:
      break;
  }
});

export default store;

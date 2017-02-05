import {
  EventEmitter
} from 'events';
import AppDispatcher from '../dispatcher/AppDispatcher'

class ListStore extends EventEmitter {

  constructor(...args) {
    super(...args);
    this.items = [{
      name: 'Hello',
      lat: 25.0,
      lng: 131.0
    }, {
      name: 'World',
      lat: 50.0,
      lng: 50.0
    }];
  }

  addChangeListener(callback) { //subscribe
    this.on('CHANGED', callback);
  }

  removeChangeListener(callback) {
    this.removeListener('CHANGED', callback);
  }

  addItem(item) {
    this.items.push(item);
  }
}

let store = new ListStore();

store.dispatchToken = AppDispatcher.register((action) => {
  switch (action.actionType) {
    case 'LIST_CHANGED':
      store.addItem(action.item);
      store.emit('CHANGED');
      break;
    default:
      break;
  }
});

export default store;

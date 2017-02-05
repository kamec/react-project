import AppDispatcher from '../dispatcher/AppDispatcher';

export default {

  addItem(item) {
    AppDispatcher.dispatch({
      actionType: 'LIST_CHANGED',
      item
    });
  }

}

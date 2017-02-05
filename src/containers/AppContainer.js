import {Container} from 'flux/utils';

import App from '../App';

import ListActions from '../actions/ListActions';
import ListStore from '../stores/ListStore';

function getStores() {
  return [
    ListStore,
  ];
}

function getState() {
  return {
    markers: ListStore.getState(),

    onAddMarker: ListActions.addMarker,
    onDeleteMarker: ListActions.removeMarker,
    onToggleMarker: ListActions.toggleMarker,
    onEditMarker: ListActions.editMarker,
  };
}

export default new Container.createFunctional(App, getStores, getState);

import {
  Container
} from 'flux/utils';

import App from '../App';

import MarkerActions from '../actions/MarkerActions';
import MarkerStore from '../stores/MarkerStore';
import MarkerDraftStore from '../stores/MarkerDraftStore';
import MarkerEditStore from '../stores/MarkerEditStore';

function getStores() {
  return [
    MarkerStore,
    MarkerDraftStore,
    MarkerEditStore,
  ];
}

function getState() {
  return {
    draft: MarkerDraftStore.getState(),
    editing: MarkerEditStore.getState(),
    markers: MarkerStore.getState(),

    onAddMarker: MarkerActions.addMarker,
    onDeleteMarker: MarkerActions.removeMarker,
    onToggleMarker: MarkerActions.toggleMarker,
    onEditMarker: MarkerActions.editMarker,
    onStartEditMarker: MarkerActions.startEditMarker,
    onStopEditMarker: MarkerActions.stopEditMarker,
    onUpdateDraft: MarkerActions.updateMarkerDraft,
  };
}

export default new Container.createFunctional(App, getStores, getState);

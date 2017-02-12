import React from 'react';

import Map from './Map/Map';
import MarkerListContainer from '../containers/MarkerListContainer';
import AddMarker from '../containers/AddMarker';
import './App.css';

const App = () => (
  <div>
    <Map />
    <MarkerListContainer />
    <AddMarker />
  </div>
)

export default App;

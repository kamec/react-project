import React from 'react';
import './App.css';

import MarkerList from './components/MarkerList/MarkerList';
import Map from './components/Map/Map';

function App(props) {
  return (
    <div>
      <MarkerList {...props} />
      <Map {...props} />
    </div>
  );
}

export default App;

import React from 'react';
import './App.css';

import List from './components/List/List';
import Map from './components/Map/Map';

function App(props) {
  return (
    <div>
      <List {...props} />
      <Map {...props} />
    </div>
  );
}

export default App;

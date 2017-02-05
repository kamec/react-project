import React, { Component } from 'react';
import './App.css';

import Map from './components/Map/Map';
import List from './components/List/List';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div>
          <List />
          <Map />
        </div>
      </div>
    );
  }
}

export default App;

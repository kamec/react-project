import React, { Component } from 'react';
import './App.css';

import Form from './components/Form/Form';
import Map from './components/Map/Map';
import List from './components/List/List';
import InfoBox from './components/InfoBox/InfoBox';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div>
          <Form />
          <List />
          <Map />
          <InfoBox
            // lat={this.state.marker.lat}
            // lng={this.state.marker.lng}
            />
        </div>
      </div>
    );
  }
}

export default App;

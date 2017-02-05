import React, { Component } from 'react';
import './App.css';

import Map from './components/Map/Map';
import List from './components/List/List';
import InfoBox from './components/InfoBox/InfoBox';

import MapStore from './stores/MapStore';

class App extends Component {
  componentWillMount() {
    this.state = {
      marker: {}
    };
  }

  componentDidMount() {
    MapStore.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    MapStore.removeChangeListener(this.onChange);
  }

  onChange = () => {
    this.setState({marker: MapStore.marker})
  }

  render() {
    return (
      <div className="App">
        <div>
          <List />
          <Map />
          <InfoBox
            latitude={this.state.marker.latitude}
            longitude={this.state.marker.longitude}
          />
        </div>
      </div>
    );
  }
}

export default App;

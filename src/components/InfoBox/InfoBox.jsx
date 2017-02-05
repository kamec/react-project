import React, {Component} from 'react';
import MapStore from '../../stores/MapStore';

class InfoBox extends Component {

  componentWillMount() {
    this.state = {
      marker: null
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
      <div>
        <div>Latitude: {this.state.marker ? this.state.marker.lat: null}</div>
        <div>Longitude: {this.state.marker ? this.state.marker.lng: null}</div>
      </div>
    )
  }
}


  export default InfoBox;

import React, {Component} from 'react';
import MapStore from '../../stores/MapStore';
import './Map.css';

class Map extends Component {

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

  renderMarker() {
    const coordinates = this.state.marker;

    const markerStyle = {
      top: coordinates.lat,
      left: coordinates.lng
    };

    return (
      <div className="marker" style={markerStyle}></div>
    )
  }

  render() {
    return (
      <div className="map">
        <img src="http://data.whicdn.com/images/63749112/large.jpg" alt="map"/> {this.state.marker
          ? this.renderMarker()
          : null}
      </div>
    )
  }
}

export default Map;

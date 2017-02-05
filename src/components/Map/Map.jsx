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
    MapStore.subscribe(this.onChange);
  }

  componentWillUnmount() {
    MapStore.unsubscribe(this.onChange);
  }

  onChange = () => {
    this.setState({marker: MapStore.marker})
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

  renderMarker() {
    const coordinates = this.state.marker;

    const markerStyle = {
      top: coordinates.latitude,
      left: coordinates.longitude
    }

    return (
      <div className="marker" style={markerStyle}></div>
    )
  }

}

export default Map;

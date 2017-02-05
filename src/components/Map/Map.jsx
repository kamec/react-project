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
    this.map = this.getNewMap(this.props.initialPosition, 4);
  }

  componentWillUnmount() {
    MapStore.removeChangeListener(this.onChange);
  }

  onChange = () => {
    this.setState({marker: MapStore.marker})
  }

  getNewMap = (center, zoom) => {
    return new window.google.maps.Map(this.refs.map, {
      center,
      scrollwheel: true,
      zoom,
      mapTypeControl: false,
      streetViewControl: false
    });
  }

  setMarker = (marker) => {
    const {lat, lng} = this.state.marker;
    new window.google.maps.Marker({
      map: this.map,
      position: {
        lat,
        lng
      },
      label: this.state.marker.name,
      draggable: true
    });
  }

  renderMarker() {
    const {lat, lng} = this.state.marker;
    this.map = this.getNewMap({
      lat,
      lng
    }, 4);
    this.setMarker(this.state.marker);
  }

  render() {
    return (
      <div>
        <div className="map" ref="map">
          <object type="%PUBLIC_URL%/loading.svg" data="loading.svg" className="loading"></object>
          {this.state.marker
            ? this.renderMarker()
            : null}
        </div>
      </div>
    )
  }
}

export default Map;

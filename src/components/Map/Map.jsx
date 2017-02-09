import React, {Component} from 'react';
import './Map.css';

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: null,
      markers: [],
      opts: {
        center: {
          lat: 0.0,
          lng: 0.0
        },
        zoom: 1,
        streetViewControl: false,
        mapTypeControl: false
      }
    }
  }

  componentDidMount() {
    this.updateState(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.state.markers.forEach(marker => marker.setMap(null));
    this.updateState(nextProps);
  }

  componentDidUpdate() {
    this.state.markers.forEach(marker => marker.setMap(this.state.map));
  }

  updateState(props) {
    if (!this.state.map) {
      const mapDiv = document.getElementsByClassName('map')[0];
      this.setState({
        map: new window.google.maps.Map(mapDiv, this.state.opts)
      });
    }
    this.setState({markers: this.buildMarkers(props)});
  }

  buildMarkers(props) {
    if (!props) {
      return [];
    }
    return [...props.markers.filter(marker => marker.chosen).values()].map(marker => this.toConfig(marker)).map(conf => new window.google.maps.Marker(conf));
  }

  toConfig(marker) {
    return {
      draggable: true,
      label: marker.name,
      position: {
        lat: marker.lat,
        lng: marker.lng
      }
    }
  }

  render() {
    return (
      <div>
        <div className="map"></div>
      </div>
    )
  }
}

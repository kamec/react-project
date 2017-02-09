import React, {Component} from 'react';
import Immutable from 'immutable';
import './Map.css';

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: null,
      markers: this.buildMarkers(props),
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
    console.log('mount');
    this.updateState(this.props);
  }

  componentWillReceiveProps(nextProps) {
    console.log('recieve props');
    if (!Immutable.is(this.props.markers, nextProps.markers)) {
      console.log('they are different from current');
      this.updateState(nextProps);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log(`should UPD? ${!Immutable.is(this.props.markers, nextProps.markers)}`);
    return !Immutable.is(this.props.markers, nextProps.markers);
  }

  componentWillUpdate(nextProps) {
    this.renderMarkers(null);
  }

  componentDidUpdate() {
    this.renderMarkers(this.state.map)
  }

  updateState(props) {
    if (!this.state.map) {
      const mapDiv = document.getElementsByClassName('map')[0];
      const map = new window.google.maps.Map(mapDiv, this.state.opts);
      this.setState({map: map});
      this.renderMarkers(map);
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

  renderMarkers(map) {
    console.log(map ? 'draw new markers' : 'remove all markers');
    this.state.markers.forEach(marker => marker.setMap(map));
  }

  render() {
    return (
      <div className="map"></div>
    )
  }
}

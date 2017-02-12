import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import MapLoader from './MapLoader';

import './Map.css';

class Map extends Component {
  constructor(...props) {
    super(...props);
    this.state = {
      markers: [],
      map: null,
      config: {
        zoom: 1,
        center: {
          lat: 0.0,
          lng: 0.0
        },
        mapTypeId: window.google.maps.MapTypeId.TERRAIN,
        mapTypeControl: false,
        streetViewControl: false
      }
    }
  }

  componentDidMount() {
    this.setState({
      map: new window.google.maps.Map(document.getElementsByClassName('map')[0], this.state.config),
      markers: this.convertMarkers(this.props.markers)
    })
  }

  componentWillReceiveProps(nextProps, nextState) {
    this.setState({
      markers: this.convertMarkers(nextProps.markers)
    })
  }

  componentWillUpdate() {
    this.state.markers.forEach(m => m.setMap(null))
  }

  componentDidUpdate() {
    this.state.markers.forEach(m => m.setMap(this.state.map))
    // this.convertMarkers(this.state.markers);
  }

  convertMarkers(markers) {
    return markers.map(marker => new window.google.maps.Marker({
      map: null,
      position: marker.coords,
      label: marker.name
    }));
  }

  render() {
    return (
      <div className='map'></div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    markers: state.markers.filter(marker => marker.checked)
  }
}

Map.contextTypes = {
  store: PropTypes.object
}

export default MapLoader(connect(mapStateToProps)(Map));

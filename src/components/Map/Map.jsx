import React, {Component, PropTypes} from 'react'
import MapLoader from './MapLoader'

import './Map.css'

class Map extends Component {

  static propTypes = {
    markers: PropTypes.array.isRequired
  }

  state = {
    markers: this.convertMarkers(this.props.markers.filter(m => m.checked)),
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

  componentDidMount() {
    this.setState({
      map: new window.google.maps.Map(document.getElementsByClassName('map')[0], this.state.config),
      markers: this.convertMarkers(this.props.markers.filter(m => m.checked))
    })
  }

  componentWillReceiveProps(nextProps, nextState) {
    this.setState({
      markers: this.convertMarkers(nextProps.markers.filter(m => m.checked))
    })
  }

  componentWillUpdate() {
    this.state.markers.forEach(m => m.setMap(null))
  }

  componentDidUpdate() {
    this.state.markers.forEach(m => m.setMap(this.state.map))
  }

  convertMarkers(markers) {
    return markers.map(marker => new window.google.maps.Marker({map: null, position: marker.coords, label: marker.name}));
  }

  render() {
    return (
      <div className='map'></div>
    )
  }
}

export default MapLoader(Map);

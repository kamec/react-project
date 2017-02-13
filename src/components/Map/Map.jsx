import React, {Component, PropTypes} from 'react'
import MapLoader from './MapLoader'

import './Map.css'

class Map extends Component {

  static propTypes = {
    markers: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
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
    this.state.markers.forEach(m => {
      m.setMap(null);
      // m.removeListener('dragend', this.handleMarkerDrag);
    })
  }

  componentDidUpdate() {
    this.state.markers.forEach(m => {
      m.setMap(this.state.map)
      m.addListener('dragend', (e) => {
        const changedMarker = this.props.markers.find(marker => marker.id === m.id);
        this.props.actions.editMarker(m.id, Object.assign({}, changedMarker, {
          coords: {
            lat: e.latLng.lat(),
            lng: e.latLng.lng()
          }
        }))
      })
    })
  }

  convertMarkers(markers) {
    return markers.map(marker => new window.google.maps.Marker({map: null, position: marker.coords, id: marker.id, label: marker.name, draggable: true}));
  }

  render() {
    return (
      <div className='map'></div>
    )
  }
}

export default MapLoader(Map);

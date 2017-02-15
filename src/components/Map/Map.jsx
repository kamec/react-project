import React, {Component, PropTypes} from 'react'
import MapLoader from './MapLoader'

import {MAP_CONFIG} from '../../constants/constants'
import './Map.css'

const maps = window.google.maps;

class Map extends Component {

  static propTypes = {
    markers: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  }

  state = {
    markers: this.extractMarkersFromProps(this.props),
    map: null,
    config: MAP_CONFIG
  }

  createResetButton(holder) {
    const button = document.createElement('button');
    button.innerHTML = 'Reset Map';
    button.onclick = this.resetMap.bind(this);
    holder.appendChild(button);
    return button;
  }

  initGMap() {
    const mapHolder = document.getElementsByClassName('map')[0];
    const map = new maps.Map(mapHolder, this.state.config);
    map.addListener('click', this.dispatchNewMarker.bind(this));
    map.controls[maps.ControlPosition.TOP_CENTER].push(this.createResetButton(mapHolder));
    return map;
  }

  componentDidMount() {
    this.setState({
      map: this.initGMap(),
      markers: this.extractMarkersFromProps(this.props)
    })
  }

  componentWillReceiveProps(nextProps, nextState) {
    this.setState({markers: this.extractMarkersFromProps(nextProps)})
  }

  componentWillUpdate() {
    this.state.markers.forEach(m => m.setMap(null))
  }

  componentDidUpdate() {
    this.state.markers.forEach(m => {
      m.setMap(this.state.map)
      m.addListener('dragend', (e) => {
        this.handleMarkerDrag(m, e)
      })
    })
  }

  handleMarkerDrag(marker, event) {
    const {actions, markers} = this.props;
    const {lat, lng} = event.latLng;

    const changedMarker = markers.find(m => m.id === marker.id);
    actions.editMarkerCoords(marker.id, Object.assign({}, changedMarker, {
      position: {
        lat: lat(),
        lng: lng()
      }
    }))
  }

  extractMarkersFromProps(props) {
    return props.markers.filter(m => m.checked).map(m => this.convertToGMarker(m))
  }

  convertToGMarker(marker) {
    return new maps.Marker({position: marker.position, id: marker.id, label: marker.name, draggable: true});
  }

  dispatchNewMarker(e) {
    const {lat, lng} = e.latLng;
    this.props.actions.addMarker(this.addNewMarker(lat(), lng()));
  }

  addNewMarker(lat, lng) {
    return {
      name: 'New Marker',
      position: {
        lat: lat,
        lng: lng
      },
      checked: true
    }
  }

  resetMap() {
    this.state.map.setZoom(1);
    this.state.map.panTo({lat: 0.0, lng: 0.0});
  }

  render() {
    return (
      <div className='map'></div>
    )
  }
}

export default MapLoader(Map);

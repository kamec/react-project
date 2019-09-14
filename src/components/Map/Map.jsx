import React, {Component} from 'react'
import PropTypes from "prop-types" 
import MapLoader from './MapLoader'

import {MAP_CONFIG, QUAKE_STYLE} from '../../constants/constants'
import './Map.css'

const maps = window.google.maps;

class Map extends Component {

  static propTypes = { // проверка типа пропсов
    markers: PropTypes.array.isRequired,
    quakesData: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    fetchActions: PropTypes.object.isRequired
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
    holder.appendChild(button); // пробрасываем в дом
    return button;
  }

  initGMap() {
    const mapHolder = document.getElementsByClassName('map')[0];
    const map = new maps.Map(mapHolder, this.state.config);
    map.data.setStyle(QUAKE_STYLE);
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

  componentWillReceiveProps(nextProps) {
    this.setState({markers: this.extractMarkersFromProps(nextProps)})
  }

  componentWillUpdate() {
    this.state.markers.forEach(m => m.setMap(null))
    if (this.state.map) {
      this.state.map.data.forEach(feature => this.state.map.data.remove(feature)); // удаление землетрясений
    }
  }

  filterValidQuakes(quakes, markers) { // выбираем землетрясения чекнутых маркеров
    return markers.some(marker => marker.id === quakes.id) && quakes.quakesData.type === "FeatureCollection";
  }

  componentDidUpdate() {
    this.props.quakesData.filter(quakes => this.filterValidQuakes(quakes, this.state.markers))
    .forEach(quake => this.state.map.data.addGeoJson(quake.quakesData));
    this.state.markers.forEach(m => {
      m.setMap(this.state.map)
      m.addListener('dragend', (e) => {
        this.handleMarkerDrag(m, e)
      })
    })
  }

  handleMarkerDrag(marker, event) { // обработчик
    const {actions, fetchActions, markers} = this.props; // деструктуризация - выдергиваем поля this.props.actions и тд
    const {lat, lng} = event.latLng;

    const changedMarker = markers.find(m => m.id === marker.id);
    const newMarker = Object.assign({}, changedMarker, { position: { lat: lat(), lng: lng() } })
    actions.editMarkerCoords(marker.id, newMarker)
    fetchActions.fetchDataIfNeeded(newMarker);
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

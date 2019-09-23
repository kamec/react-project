import React, { Component } from 'react';
import PropTypes from "prop-types";
import MapLoader from './MapLoader';

import { MAP_CONFIG, QUAKE_STYLE } from '../../constants/constants';
import './Map.css';

const { maps } = window.google;

function filterValidQuakes(quakes, markers) {
  return markers.some(marker => marker.id === quakes.id) && quakes.quakesData.type === "FeatureCollection";
}

function convertToGMarker({ position, id, name }) {
  return new maps.Marker({ position, id, label: name, draggable: true });
}

function extractMarkersFromProps(props) {
  return props.markers.filter(({ checked }) => checked).map(convertToGMarker);
}

function addNewMarker(lat, lng) {
  return {
    name: 'New Marker',
    position: {
      lat,
      lng
    },
    checked: true
  }
}

class Map extends Component {

  constructor(props) {
    super(props);
    this.state =
      {
        markers: extractMarkersFromProps(this.props),
        map: null,
        config: MAP_CONFIG
      }
  }

  componentDidMount() {
    this.setState({
      map: this.initGMap(),
      markers: extractMarkersFromProps(this.props)
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ markers: extractMarkersFromProps(nextProps) })
  }

  componentWillUpdate() {
    const { markers, map } = this.state;
    markers.forEach(m => m.setMap(null))
    if (map) {
      map.data.forEach(feature => map.data.remove(feature));
    }
  }

  componentDidUpdate() {
    const { quakesData } = this.props;
    const { markers, map } = this.state;
    quakesData.filter(quakes => filterValidQuakes(quakes, markers))
      .forEach(quake => map.data.addGeoJson(quake.quakesData));
    markers.forEach(m => {
      m.setMap(map)
      m.addListener('dragend', (e) => {
        this.handleMarkerDrag(m, e)
      })
    })
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
    const { config } = this.state;
    const map = new maps.Map(mapHolder, config);
    map.data.setStyle(QUAKE_STYLE);
    map.addListener('click', this.dispatchNewMarker.bind(this));
    map.controls[maps.ControlPosition.TOP_CENTER].push(this.createResetButton(mapHolder));
    return map;
  }

  handleMarkerDrag(marker, event) {
    const { actions, fetchActions, markers } = this.props;
    const { lat, lng } = event.latLng;

    const changedMarker = markers.find(m => m.id === marker.id);
    const newMarker = { ...changedMarker, position: { lat: lat(), lng: lng() } };
    actions.editMarkerCoords(marker.id, newMarker);
    fetchActions.fetchDataIfNeeded(newMarker);
  }

  dispatchNewMarker(e) {
    const { lat, lng } = e.latLng;
    const { actions } = this.props;
    actions.addMarker(addNewMarker(lat(), lng()));
  }

  resetMap() {
    const { map } = this.state;
    map.setZoom(1);
    map.panTo({ lat: 0.0, lng: 0.0 });
  }

  render() {
    return (
      <div className='map' />
    )
  }
}

Map.propTypes = {
  markers: PropTypes.arrayOf.isRequired,
  quakesData: PropTypes.arrayOf().isRequired,
  actions: PropTypes.shape({ type: PropTypes.string, payload: PropTypes.shape }).isRequired,
  fetchActions: PropTypes.shape({ type: PropTypes.string, payload: PropTypes.shape }).isRequired
}

export default MapLoader(Map);
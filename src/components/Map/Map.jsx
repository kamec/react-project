import React from 'react';

import './Map.css';

function Map(props) {
  return (
    <div>
      <div className="map" ref="map">
        {window.google
          ? showLoadingIcon()
          : null}
        {this.state.marker
          ? renderMarker()
          : null}
      </div>
    </div>
  )
}

function getNewMap(center, zoom) {
  return new window.google.maps.Map(this.refs.map, {
    center,
    scrollwheel: true,
    zoom,
    mapTypeId: window.google.maps.MapTypeId.TERRAIN,
    mapTypeControl: false,
    streetViewControl: false
  });
}

function setMarker(marker) {
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

function renderMarker() {
  const {lat, lng} = this.state.marker;
  this.map = this.getNewMap({
    lat,
    lng
  }, 4);
  this.setMarker(this.state.marker);
}

function showLoadingIcon() {
  return (
    <object type="%PUBLIC_URL%/loading.svg" data="loading.svg" className="loading"></object>
  )
}

export default Map;

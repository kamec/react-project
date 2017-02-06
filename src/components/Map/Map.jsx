import React from 'react';
import './Map.css';

function Map(props) {
  let map = null;
  const opts = {
    center: {
      lat: 2.0,
      lng: 50.0
    },
    zoom: 4
  }

  return (
    <div>
      <div className="map" ref={div => {
        map = new window.google.maps.Map(div, opts);
        buildMarkers(props, map);
      }}></div>
    </div>
  )
}

function buildMarkers(props, map) {
  [...props.markers.filter(marker => marker.chosen).values()].map(marker => toConfig(marker, map)).map(conf => new window.google.maps.Marker(conf));
}

function toConfig(marker, map) {
  return {
    title: marker.name,
    position: {
      lat: marker.lat,
      lng: marker.lng
    },
    map: map
  }
}

export default Map;

import React from 'react';
import Marker from './Marker';

const MarkerList = ({markers, onMarkerClick, onMarkerRemove}) => (
  <ul>
    {markers.map((marker, id) => <Marker key={id} marker={marker} onClick={() => onMarkerClick(id)} onMarkerRemove/>)}
  </ul>
)

export default MarkerList;

import React from 'react';

const Marker = ({marker, onClick, onRemove}) => {
  return (
    <li>
      <input type="checkbox" checked={marker.checked} onChange={onClick}></input>
      <label>{marker.name}</label>
      <label>({marker.coords.lat}x{marker.coords.lng})</label>
      <button type="button" onClick={onRemove}>x</button>
    </li>
  )
}
export default Marker;

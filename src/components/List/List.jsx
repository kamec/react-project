import React from 'react';

import './List.css';

function List(props) {
  if (props.markers.size === 0) {
    return null;
  }

  return (
    <ul>
      {[...props.markers.values()].map(marker => (
        <MarkerItem
          key={marker.id}
          id={marker.id}
          name={marker.name}
          lat={marker.lat}
          lng={marker.lng}
          chosen={marker.chosen}
          onDeleteMarker={props.onDeleteMarker}
          onToggleMarker={props.onToggleMarker}
          onStartEditingMarker={props.onStartEditingMarker}
          />
      ))}
    </ul>
  );
}

function MarkerItem(props) {
  const onDeleteMarker = () => props.onDeleteMarker(props.id);
  const onToggleMarker = () => props.onToggleMarker(props.id);

  return (
    <li><input type="checkbox" onChange={onToggleMarker} checked={props.chosen}/><label>{props.name}</label><button onClick={onDeleteMarker} >x</button></li>
  );
}

export default List;

import React from 'react';
import './MarkerList.css';

function MarkerList(props) {
  if (props.markers.size === 0) {
    return null;
  }

  return (
    <div>
      <NewMarkerInput {...props}/>
      <ul>
        {[...props.markers.values()].map(marker => (
            <MarkerItem
              key={marker.id}
              editing={props.editing}
              marker={marker}
              onDeleteMarker={props.onDeleteMarker}
              onEditMarker={props.onEditMarker}
              onStartEditMarker={props.onStartEditMarker}
              onStopEditMarker={props.onStopditMarker}
              onToggleMarker={props.onToggleMarker}
              />
          ))}
      </ul>
    </div>
  );
}

function prepareMarker(markerString) {
  const tokens = markerString.trim().split(' ');
  if (tokens.length !== 3) {
    return;
  }
  return {
    name: tokens[0],
    lat: Number.parseFloat(tokens[1]) % 90 || 0.0,
    lng: Number.parseFloat(tokens[2]) % 180 || 0.0,
  }
}

const ENTER_KEY_CODE = 13;
function NewMarkerInput(props) {
  const addMarker = () => props.onAddMarker(prepareMarker(props.draft));
  const onBlur = () => addMarker();
  const onChange = (event) => props.onUpdateDraft(event.target.value);
  const onKeyDown = (event) => {
    if (event.keyCode === ENTER_KEY_CODE) {
      addMarker();
    }
  };
  return (
    <input
      id="new-marker"
      placeholder="New place codename and coords?"
      value={props.draft || ''}
      onBlur={onBlur}
      onChange={onChange}
      onKeyDown={onKeyDown}
      />
  );
}

function MarkerItem(props) {
  const {editing, marker} = props;
  const isEditing = editing === marker.id;
  const onDeleteMarker = () => props.onDeleteMarker(marker.id);
  const onStartEditMarker = () => props.onStartEditMarker(marker.id);
  const onToggleMarker = () => props.onToggleMarker(marker.id);

  let input = null;
  if (isEditing) {
    const onChange = (event) => props.onEditMarker(marker.id, event.target.value);
    const onStopEditMarker = props.onStopEditMarker;
    const onKeyDown = (event) => {
      if (event.keyCode === ENTER_KEY_CODE) {
        onStopEditMarker();
      }
    };
    input = <input
      autoFocus={true}
      className="edit"
      value={marker.name}
      onBlur={onStopEditMarker}
      onChange={onChange}
      onKeyDown={onKeyDown}
      />;
  }

  return (
    <li>
      <input type="checkbox" onChange={onToggleMarker} checked={marker.chosen}/>
      <label onDoubleClick={onStartEditMarker}>
        {marker.name}
      </label>
      <button onClick={onDeleteMarker}>x</button>
    </li>
  );
}

export default MarkerList;

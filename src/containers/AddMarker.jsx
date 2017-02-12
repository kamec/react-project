import React from 'react';
import {connect} from 'react-redux';
import MarkerActions from '../actions/MarkerActions';

let AddMarker = ({dispatch}) => {
  let input;

  const buildMarker = (tokens) => ({
    name: tokens[0],
    coords: {
      lat: Number.parseFloat(tokens[1]) % 90 || 0.0,
      lng: Number.parseFloat(tokens[2]) % 180 || 0.0
    },
    checked: false
  });

  const handleMarkerAdd = e => {
    e.preventDefault();
    const tokens = input.value.trim().replace(/\s+/, ' ').split(' ');
    if (tokens.length !== 3) {
      return;
    }
    dispatch(MarkerActions.addMarker(buildMarker(tokens)));
    input.value = '';
  }

  return (
    <div>
      <form onSubmit={handleMarkerAdd}>
        <input ref={node => {
          input = node
        }} onBlur={handleMarkerAdd}/>
        <button type="submit">
          Add Marker
        </button>
      </form>
    </div>
  )
}

AddMarker = connect()(AddMarker);

export default AddMarker;

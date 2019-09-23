import React, { Component } from 'react';
import PropTypes from "prop-types";

import MarkerInput from './MarkerInput';
import MarkerList from './MarkerList/MarkerList';
import './MarkersAside.css';

export default class MarkerAside extends Component {
  createMarker = tokens => ({
    name: tokens[0],
    position: {
      lat: tokens[1],
      lng: tokens[2]
    },
    checked: true
  });

  handleSave = input => {
    const tokens = input.trim().replace(/\s+/, ' ').split(' ');
    if (tokens.length !== 3) {
      return;
    }
    tokens[1] = Number.parseFloat(tokens[1]) % 90 || 0.0;
    tokens[2] = Number.parseFloat(tokens[2]) % 180 || 0.0;
    const { actions } = this.props;
    actions.addMarker(this.createMarker(tokens));
  }

  render() {
    return (
      <aside className="markers-aside">
        <h1>Markers</h1>
        <MarkerInput onSave={this.handleSave} placeholder="Name lat lng" newMarker />
        <MarkerList {...this.props} />
      </aside>
    )
  }
}
MarkerAside.propTypes = {
  actions: PropTypes.shape({ type: PropTypes.string, payload: PropTypes.shape }).isRequired,
  fetchActions: PropTypes.shape({ type: PropTypes.string, payload: PropTypes.shape }).isRequired,
  markers: PropTypes.arrayOf.isRequired,
  dispatch: PropTypes.func.isRequired,
}

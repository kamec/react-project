import React, {PropTypes, Component} from 'react'

import {WEATHER_URL} from '../constants/ActionTypes'
import MarkerNameInput from './MarkerNameInput'
import MarkerList from './MarkerList/MarkerList'

export default class MarkerAside extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    markers: PropTypes.array.isRequired
  }

  buildMarker = tokens => ({
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
    tokens[1] = Number.parseFloat(tokens[1]) % 90 || 0.0
    tokens[2] = Number.parseFloat(tokens[2]) % 180 || 0.0
    this.props.actions.addMarker(this.buildMarker(tokens), WEATHER_URL(tokens[1], tokens[2]))
  }

  render() {
    return (
      <aside className="markers-aside">
        <h1>Markers</h1>
        <MarkerNameInput onSave={this.handleSave} placeholder="Marker name lat lng" newMarker/>
        <MarkerList actions={this.props.actions} markers={this.props.markers}/>
      </aside>
    )
  }
}

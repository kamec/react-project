import React, {PropTypes, Component} from 'react'

import MarkerInput from './MarkerInput'
import MarkerList from './MarkerList/MarkerList'
import './MarkersAside.css'

export default class MarkerAside extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    fetchActions: PropTypes.object.isRequired,
    markers: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

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
    this.props.actions.addMarker(this.createMarker(tokens));
  }

  render() {
    return (
      <aside className="markers-aside">
        <h1>Markers</h1>
        <MarkerInput onSave={this.handleSave} placeholder="Name lat lng" newMarker/>
        <MarkerList {...this.props}/>
      </aside>
    )
  }
}

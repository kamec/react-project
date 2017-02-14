import React, {PropTypes, Component} from 'react'
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
      lat: Number.parseFloat(tokens[1]) % 90 || 0.0,
      lng: Number.parseFloat(tokens[2]) % 180 || 0.0
    },
    checked: true
  });

  handleSave = input => {
    const tokens = input.trim().replace(/\s+/, ' ').split(' ');
    if (tokens.length !== 3) {
      return;
    }
    this.props.actions.addMarker(this.buildMarker(tokens))
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

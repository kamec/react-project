import React, {Component, PropTypes} from 'react'
import Marker from './Marker'

export default class MarkerList extends Component {

  static propTypes = {
    actions: PropTypes.object.isRequired,
    markers: PropTypes.array.isRequired,
  }

  render() {
    const {markers, actions} = this.props;
    return (
      <ul>
        {markers.map((marker, id) => <Marker key={marker.id} marker={marker} {...actions}/>)}
      </ul>
    )
  }
}

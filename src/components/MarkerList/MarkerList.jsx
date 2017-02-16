import React, {Component, PropTypes} from 'react'
import Marker from './Marker'
import './MarkerList.css'

export default class MarkerList extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    fetchActions: PropTypes.object.isRequired,
    markers: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  render() {
    const {markers, actions, fetchActions} = this.props;
    return (
      <ul className="marker-list">
        {markers.map((marker, id) => <Marker key={marker.id} marker={marker} {...actions} {...fetchActions}/>)}
      </ul>
    )
  }
}

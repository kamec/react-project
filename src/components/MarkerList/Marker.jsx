import React, {Component, PropTypes} from 'react'
import MarkerNameInput from '../MarkerNameInput'

export default class Marker extends Component {
  static propTypes = {
    marker: PropTypes.object.isRequired,
    editMarkerName: PropTypes.func.isRequired,
    removeMarker: PropTypes.func.isRequired,
    toggleMarker: PropTypes.func.isRequired,
    invalidateData: PropTypes.func.isRequired,
    fetchDataIfNeeded: PropTypes.func.isRequired
  }

  state = {
    editing: false
  }

  componentDidMount() {
    this.props.fetchDataIfNeeded(this.props.marker);
  }

  handleDoubleClick = () => {
    this.setState({editing: true})
  }

  handleSave = (id, name) => {
    if (name.length === 0) {
      this.props.removeMarker(id)
    } else {
      this.props.editMarkerName(id, Object.assign({}, this.props.marker, {name: name}))
    }
    this.setState({editing: false})
  }

  render() {
    const {marker, toggleMarker, removeMarker, invalidateData, fetchDataIfNeeded} = this.props;
    let item;
    if (this.state.editing) {
      item = (<MarkerNameInput input={marker.name} editing={this.state.editing} onSave={(name) => this.handleSave(marker.id, name)}/>)
    } else {
      item = (
        <div>
          <input type="checkbox" checked={marker.checked} onChange={() => toggleMarker(marker.id)}/>
          <label onDoubleClick={this.handleDoubleClick}> {marker.name} </label>
          {"\t"}
          <label> ({marker.position.lat}x{marker.position.lng}) </label>
          <button type="button" onClick={() => {
              invalidateData(marker);
              fetchDataIfNeeded(marker);
            }}>Refresh</button>
          <button type="button" onClick={() => removeMarker(marker.id)}>x</button>
        </div>
      )
    }

    return (
      <li>
        {item}
      </li>
    )
  }
}

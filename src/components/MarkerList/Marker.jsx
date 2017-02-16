import React, {Component, PropTypes} from 'react'
import MarkerInput from '../MarkerInput'
import './Marker.css'

export default class Marker extends Component {
  static propTypes = {
    marker: PropTypes.object.isRequired,
    editMarkerName: PropTypes.func.isRequired,
    removeMarker: PropTypes.func.isRequired,
    toggleMarker: PropTypes.func.isRequired,
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
    const {marker, toggleMarker, removeMarker} = this.props;
    let item;
    if (this.state.editing) {
      item = (<MarkerInput className="marker-name-editor" input={marker.name} editing={this.state.editing} onSave={(name) => this.handleSave(marker.id, name)}/>)
    } else {
      item = (
        <div className="marker">
          <input className="marker-checked-input" type="checkbox" checked={marker.checked} onChange={() => toggleMarker(marker.id)}/>
          <label className="marker-name label" onDoubleClick={this.handleDoubleClick}>
            {marker.name}
          </label>
          {"\t"}
          <label className="marker-position label">
            ({marker.position.lat.toFixed(3)}x{marker.position.lng.toFixed(3)})
          </label>
          <button className="marker-remove button" type="button" onClick={() => removeMarker(marker.id)}>x</button>
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

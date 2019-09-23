import React, { Component } from 'react'
import PropTypes from "prop-types"
import MarkerInput from '../MarkerInput'
import './Marker.css'

export default class Marker extends Component {

  constructor(props) {
    super(props);
    this.state = {
      editing: false
    }
  }

  componentDidMount() {
    const { marker, fetchDataIfNeeded } = this.props;
    fetchDataIfNeeded(marker);
  }

  handleDoubleClick = () => {
    this.setState({ editing: true })
  }

  handleSave = (id, name) => {
    const { removeMarker, editMarkerName, marker } = this.props;
    if (name.length === 0) {
      removeMarker(id)
    } else {
      editMarkerName(id, { ...marker, name })
    }

    this.setState({ editing: false })
  }

  render() {
    const { marker, toggleMarker, removeMarker } = this.props;
    const { editing } = this.state;
    let item;
    if (editing) {
      item = (<MarkerInput className="marker-name-editor" input={marker.name} editing={editing} onSave={(name) => this.handleSave(marker.id, name)} />)
    } else {
      item = (
        <div className="marker">

          <label className="marker-name label" htmlFor={marker.id} onDoubleClick={this.handleDoubleClick}>
            <input className="marker-checked-input" type="checkbox" id={marker.id} checked={marker.checked} onChange={() => toggleMarker(marker.id)} />
            {marker.name}
          </label>
          {"\t"}
          <span className="marker-position label">
            (
            {marker.position.lat.toFixed(3)}
            x
            {marker.position.lng.toFixed(3)}
            )
          </span>
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

Marker.propTypes = {
  marker: PropTypes.shape({ name: PropTypes.arrayOf(), position: PropTypes.arrayOf(), checked: PropTypes.bool, id: PropTypes.string }).isRequired,
  editMarkerName: PropTypes.func.isRequired,
  removeMarker: PropTypes.func.isRequired,
  toggleMarker: PropTypes.func.isRequired,
  fetchDataIfNeeded: PropTypes.func.isRequired,
}


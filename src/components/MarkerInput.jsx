import React, {Component} from 'react'
import PropTypes from "prop-types" 
import './MarkerInput.css'

export default class MarkerInput extends Component {
  static propTypes = {
    editing: PropTypes.bool,
    input: PropTypes.string,
    newMarker: PropTypes.bool,
    onSave: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
  }

  state = {
    input: this.props.input || ''
  }

  handleSubmit = e => {
    const ENTER_BUTTON_CODE = 13;
    if (e.which === ENTER_BUTTON_CODE) {
      this.props.onSave(this.state.input);
      if (this.props.newMarker) {
        this.setState({input: ''})
      }
    }
  }

  handleChange = e => { // обработка изменений
    this.setState({input: e.target.value})
  }

  handleBlur = e => {
    if (!this.props.newMarker) {
      this.props.onSave(e.target.value)
    }
  }

  render() {
    return (
      <input
        className="marker-input"
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onKeyDown={this.handleSubmit}
        placeholder={this.props.placeholder}
        type='text'
        value={this.state.input}
      />
    )
  }
}

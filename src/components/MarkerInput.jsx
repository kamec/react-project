import React, { Component } from 'react';
import PropTypes from "prop-types";
import './MarkerInput.css';

export default class MarkerInput extends Component {

  constructor(props) {
    super(props);
    const { input } = this.props;
    this.state = {
      input
    }
  }

  handleSubmit = e => {
    const ENTER_BUTTON_CODE = 13;
    if (e.which === ENTER_BUTTON_CODE) {
      const { input } = this.state;
      const { newMarker, onSave } = this.props;
      onSave(input);
      if (newMarker) {
        this.setState({ input: '' });
      }
    }
  }

  handleChange = e => { 
    this.setState({ input: e.target.value })
  }

  handleBlur = e => {
    const { newMarker, onSave } = this.props;
    if (!newMarker) {
      onSave(e.target.value);
    }
  }

  render() {
    const { input } = this.state;
    const { placeholder} = this.props;
    return (
      <input
        className="marker-input"
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onKeyDown={this.handleSubmit}
        placeholder={placeholder}
        type='text'
        value={input}
      />
    )
  }
}

MarkerInput.propTypes = {
  input: PropTypes.string,
  newMarker: PropTypes.bool.isRequired,
  onSave: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
}
MarkerInput.defaultProps = {
  input: '',
  placeholder: '',
}

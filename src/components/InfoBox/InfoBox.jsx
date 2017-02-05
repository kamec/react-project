import React, {Component} from 'react';

class InfoBox extends Component {
  render() {
    return (
      <div>
        <div>Latitude: {this.props.latitude}</div>
        <div>Longitude: {this.props.longitude}</div>
      </div>
    )
  }
}

export default InfoBox;

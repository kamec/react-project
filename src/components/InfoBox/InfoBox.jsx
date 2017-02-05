import React, {Component} from 'react';

class InfoBox extends Component {
  render() {
    return (
      <div>
        <div>Latitude: {this.props.lat}</div>
        <div>Longitude: {this.props.lng}</div>
      </div>

    )
  }
}


  export default InfoBox;

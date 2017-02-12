import React, {Component} from 'react';
import './MapLoader.css'

const MapLoader = (WrappedComponent) => {
  return class MapLoader extends Component {
    render() {
      return window.google
        ? <WrappedComponent {...this.props}/>
        : <div className='loader'></div>
    }
  }
}

export default MapLoader;

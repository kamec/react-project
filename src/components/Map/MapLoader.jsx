import React from 'react';
import './MapLoader.css';

const loader = WrappedComponent => {
  const MapLoader = props => window.google
    ? <WrappedComponent {...props} />
    : <div className='loader' />;

  return MapLoader;
}


export default loader;

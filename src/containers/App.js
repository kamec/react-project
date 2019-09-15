import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as MarkerActions from '../actions/MarkerActions';
import * as FetchActions from '../actions/FetchActions';
import MarkersAside from '../components/MarkersAside';
import Map from '../components/Map/Map';
import './App.css';

const mapStateToProps = state => ({ markers: state.markers, quakesData: state.quakesData });

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(MarkerActions, dispatch),
  fetchActions: bindActionCreators(FetchActions, dispatch),
  dispatch
});

const App = props => (
  <div className="app">
    <MarkersAside {...props} />
    <Map {...props} />
  </div>
)

export default connect(mapStateToProps, mapDispatchToProps)(App); 

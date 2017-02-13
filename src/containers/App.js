import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as MarkerActions from '../actions/MarkerActions';
import MarkersAside from '../components/MarkersAside';
import Map from '../components/Map/Map';
import './App.css';

const App = ({markers, actions}) => (
  <div>
    <MarkersAside markers={markers} actions={actions}/>
    <Map markers={markers}/>
  </div>
)

App.PropTypes = {
  markers: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}

const mapStateToProps = state => ({markers: state.markers})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(MarkerActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(App);

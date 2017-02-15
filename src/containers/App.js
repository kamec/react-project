import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import * as MarkerActions from '../actions/MarkerActions'
import MarkersAside from '../components/MarkersAside'
import Map from '../components/Map/Map'
import './App.css'

const mapStateToProps = state => ({markers: state.markers})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(MarkerActions, dispatch),
  dispatch: dispatch
})

class App extends Component {
  render() {
    return (
      <div>
        <MarkersAside actions={this.props.actions} markers={this.props.markers}/>
        <Map actions={this.props.actions} markers={this.props.markers}/>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

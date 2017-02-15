import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import * as MarkerActions from '../actions/MarkerActions'
import * as FetchActions from '../actions/FetchActions'
import MarkersAside from '../components/MarkersAside'
import Map from '../components/Map/Map'
import './App.css'

const mapStateToProps = state => ({markers: state.markers, weatherData: state.weatherData})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(MarkerActions, dispatch),
  fetchActions: bindActionCreators(FetchActions, dispatch)
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

import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import * as MarkerActions from '../actions/MarkerActions'
import * as FetchActions from '../actions/FetchActions'
import MarkersAside from '../components/MarkersAside'
import Map from '../components/Map/Map'
import './App.css'

const mapStateToProps = state => ({markers: state.markers, quakesData: state.quakesData})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(MarkerActions, dispatch), // оборачивает вызов Dispatch(action)
  fetchActions: bindActionCreators(FetchActions, dispatch),
  dispatch
})

class App extends Component {
  render() {
    return (
      <div className="app">
        <MarkersAside {...this.props}/>
        <Map {...this.props}/>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App); // преобразование получаемого Redux.store в React.props

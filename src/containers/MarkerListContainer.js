import {connect} from 'react-redux';
import MarkerActions from '../actions/MarkerActions';
import MarkerList from '../components/MarkerList/MarkerList';

const mapStateToProps = (state) => {
  return {
    markers: state.markers
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onMarkerClick: (id) => {
      dispatch(MarkerActions.toggleMarker(id))
    }
  }
}

const MarkerListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MarkerList);

export default MarkerListContainer;

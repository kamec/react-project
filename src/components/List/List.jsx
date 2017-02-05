import React, {Component} from 'react';
import ListStore from '../../stores/ListStore';
import MapActions from '../../actions/MapActions';

class List extends Component {

  componentWillMount() {
    this.state = {
      items: ListStore.items
    };
  }

  componentDidMount() {
    ListStore.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    ListStore.removeChangeListener(this.onChange);
  }

  onChange = () => {
    this.setState({items: ListStore.items});
  }

  onListItemClick = (item) => {
    return function() {
      MapActions.setMarkerOnMap(item.lat, item.lng);
    }
  }

  renderItem = (item) => {
    return (
      <li key={item.name}>
        <a href="#" onClick={this.onListItemClick(item)}>{item.name}</a>
      </li>
    )
  }

  render() {
    return (
      <ul>
        {this.state.items.map(item => this.renderItem(item))}
      </ul>
    )
  }
}

export default List;

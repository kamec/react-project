import React, {Component} from 'react';
import ListStore from '../../stores/ListStore';
import MapActions from '../../actions/MapActions';

import './List.css';

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
      MapActions.setMarkerOnMap(item);
    }
  }

  renderItem = (item) => {
    return (
      <li key={item.id}>
        <input type="checkbox" onChange={this.onListItemClick(item)}></input>
        <a href="#">{item.name}</a>
        <button>x</button>
      </li>
    )
  }

  render() {
    return (
      <ul className="marker-list">
        {this.state.items.map(item => this.renderItem(item))}
      </ul>
    )
  }
}

export default List;

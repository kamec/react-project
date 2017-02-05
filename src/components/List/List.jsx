import React, {Component} from 'react';
import MapActions from '../../actions/MapActions';

class List extends Component {

  onListItemClick = (item) => {
    return function() {
      MapActions.setMarkerOnMap(item.latitude, item.longitude);
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
    const items = [
      {
        name: 'Hello',
        latitude: 100,
        longitude: 100
      }, {
        name: 'World',
        latitude: 250,
        longitude: 350
      }
    ];
    return (
      <ul>
        {items.map(item => this.renderItem(item))}
      </ul>
    )
  }
}

export default List;

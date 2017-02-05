import React, {Component} from 'react';
import ListActions from '../../actions/ListActions';

class Form extends Component {

  componentWillMount() {
    this.state = {
      rawItem: ''
    }
  }

  render() {
    return (
      <form>
        <input type="text" onChange={this.handleChange.bind(this)}></input>
        <button onClick={this.addItemToList.bind(this)} type="button">Add item</button>
      </form>
    )
  }

  handleChange = (event) => {
    let {value} = event.target;
    this.setState({rawItem: value});
  }

  addItemToList = () => {
    const tokens = this.state.rawItem.trim().split(' ');
    if (tokens.length !== 3) {
      return;
    }

    ListActions.addItem({
      name: tokens[0],
      lat: Number.parseInt(tokens[1], 10),
      lng: Number.parseInt(tokens[2], 10)
    });

    this.setState({rawItem: ''});
  }
}

export default Form;

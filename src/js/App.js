import React, { Component } from 'react';
import Graph from './components/Graph.js';

const getTodayDate = () => {
  const date = new Date();
  return `${date.getFullYear()}-${zerofy(date.getMonth() + 1)}-${zerofy(date.getDate())}`;
};
const zerofy = number => {
  if (number < 10) {
    return '0' + number;
  }
  return number;
};
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: getTodayDate()
    };
    this.handleChange = e => this.setState({ date: e.target.value });
  }
  render() {
    return (
      <div className="content-box">
        <div className="date-picker">
          <h4>Fecha</h4>
          <input type="date" value={this.state.date} onChange={this.handleChange} />
        </div>
        <Graph date={this.state.date} />
      </div>
    );
  }
}

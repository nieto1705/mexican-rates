import React, { Component } from 'react';
import Summary from './components/Summary.js';
import DatePicker from './components/DatePicker.js';

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
    this.handleChange = date => this.setState({ date });
  }
  render() {
    return (
      <div className="content-box">
        <div className="date-picker">
          <h4>Fecha</h4>
          <DatePicker value={this.state.date} onChange={this.handleChange} max={getTodayDate()} />
        </div>
        <Summary date={this.state.date} />
      </div>
    );
  }
}

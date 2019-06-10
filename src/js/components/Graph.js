import React, { Component } from 'react';
import withRates from './hocs/withRates.js';
import c3 from 'c3';

class Graph extends Component {
  componentDidMount() {
    this.chart = c3.generate({
      bindto: this.chartRef,
      data: {
        columns: [['data1', 30, 200, 100, 400, 150, 250], ['data2', 50, 20, 10, 40, 15, 25]]
      }
    });
  }
  render() {
    return <div ref={ref => (this.chartRef = ref)} />;
  }
}

export default withRates(Graph);

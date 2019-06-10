import React, { Component } from 'react';
import withRates from './hocs/withRates.js';
import c3 from 'c3';

class Graph extends Component {
  componentDidMount() {
    this.chart = c3.generate({
      bindto: this.chartRef,
      data: {
        columns: this.props.rates
      }
    });
  }
  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps.rates) !== JSON.stringify(this.props.rates)) {
      this.chart.load({
        columns: this.props.rates,
        type: 'bar'
      });
    }
  }
  render() {
    return <div ref={ref => (this.chartRef = ref)} />;
  }
}

export default withRates(Graph);

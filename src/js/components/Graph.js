import React, { Component } from 'react';
import withRates from './hocs/withRates.js';
import c3 from 'c3';
import * as d3 from 'd3';


class Graph extends Component {
  componentDidMount() {
    this.chart = c3.generate({
      bindto: this.chartRef,
      data: {
        x: 'x',
        columns: [['x', this.props.base], ...this.props.rates]
      },
      axis: {
        x: {
          type: 'category'
        },
        y:{
          tick:{
            format: d3.format("$")
          }
        }
      }
    });
  }
  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps.rates) !== JSON.stringify(this.props.rates)) {
      this.chart.load({
        columns: [['x', this.props.base], ...this.props.rates],
        type: 'bar'
      });
    }
  }
  render() {
    return <div ref={ref => (this.chartRef = ref)} />;
  }
}

export default withRates(Graph);

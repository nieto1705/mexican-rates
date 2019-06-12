import React, { Component } from 'react';
import PropTypes from 'prop-types';
import c3 from 'c3';
import * as d3 from 'd3';

export default class Graph extends Component {
  constructor(props) {
    super(props);

    //binds
    this.initChart = this.initChart.bind(this);
  }
  componentDidMount() {
    /// solo se creara la grafica una vez que todo este cargado
    if (!this.props.loading) {
      this.initChart();
    }
  }
  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps.rates) !== JSON.stringify(this.props.rates)) {
      if (!this.chart) {
        this.initChart();
      } else {
        this.chart.load({
          columns: [['x', this.props.base], ...this.props.rates],
          type: 'bar'
        });
      }
    }
  }
  initChart() {
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
        y: {
          tick: {
            format: d3.format('$')
          }
        }
      }
    });
  }
  render() {
    return <div ref={ref => (this.chartRef = ref)} />;
  }
}

Graph.propTypes = {
  base: PropTypes.string,
  rates: PropTypes.array,
  loading: PropTypes.bool
};

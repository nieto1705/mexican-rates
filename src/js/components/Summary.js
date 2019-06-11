import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Graph from './Graph';

export default class Summary extends Component {
  render() {
    return (
      <div className="summary-container">
        <Graph {...this.props} />
      </div>
    );
  }
}

Summary.propTypes = {
  base: PropTypes.string,
  rates: PropTypes.array,
  loading: PropTypes.bool,
  error: PropTypes.bool
};

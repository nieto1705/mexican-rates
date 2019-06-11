import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { API_KEY } from '../../utils/constants.js';
import axios from 'axios';
import memoize from 'memoizee';

function withRates(WrappedComponent) {
  class hoc extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: false,
        rates: [],
        base: 'MXN'
      };
      this.memoizeData = memoize(this.getData, {
        promise: true,
        maxAge: 60000
      });
      this.handleDateChange = this.handleDateChange.bind(this);
    }
    componentDidMount() {
      this.handleDateChange();
    }
    componentDidUpdate(prevProps) {
      if (prevProps.date !== this.props.date) {
        this.handleDateChange();
      }
    }
    handleDateChange() {
      this.setState({ loading: true });
      this.memoizeData(this.props.date).then(data => {
        this.setState(data);
      });
    }
    getData(date) {
      const currencies = ['USD', 'AUD', 'CAD', 'PLN', 'MXN'];
      const url = this.makeUrl(date, currencies);
      return axios
        .get(url)
        .then(({ data }) => {
          return {
            rates: Object.keys(data.rates).map(key => [key, data.rates[key]]),
            error: false
          };
        })
        .catch(() => {
          return {
            rates: [],
            error: true
          };
        });
    }
    makeUrl(date, currencies) {
      const currencyList = currencies.reduce(
        (str, currency) => str + (str ? ',' : '') + currency,
        ''
      );
      return `http://data.fixer.io/api/${date}?access_key=${API_KEY}&symbols=${currencyList}&format=1`;
    }
    render() {
      return (
        <WrappedComponent
          loading={this.state.loading}
          base={this.state.base}
          error={this.state.error}
          rates={this.state.rates}
        />
      );
    }
  }
  hoc.propTypes = {
    date: PropTypes.string
  };
  return hoc;
}

export default withRates;

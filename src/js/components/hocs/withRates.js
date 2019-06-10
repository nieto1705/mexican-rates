import React, { Component } from 'react';
import { API_KEY } from '../../utils/constants.js';
import axios from 'axios';
import memoize from 'memoizee';

function withRates(WrappedComponent) {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: false,
        rates: []
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
        this.setState({ rates: data, loading: false });
      });
    }
    getData(date) {
      const currencies = ['USD', 'AUD', 'CAD', 'PLN', 'MXN'];
      const url = this.makeUrl(date, currencies);
      return axios
        .get(url)
        .then(({ data }) => {
          return Object.keys(data.rates).map(key => [key, data.rates[key]]);
        })
        .catch(error => {
          console.log('something went wrong');
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
        <WrappedComponent loading={this.state.loading} rates={this.state.rates} {...this.props} />
      );
    }
  };
}

export default withRates;

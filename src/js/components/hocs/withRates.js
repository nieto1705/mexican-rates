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
        base: 'MXN',
        currencies: ['USD', 'AUD', 'CAD', 'PLN', 'MXN', 'EUR']
      };
      //Se ocupa memoize para reducir el numero de llamadas al server
      this.memoizeData = memoize(this.getData, {
        promise: true,
        maxAge: 100000
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
      const url = this.makeUrl(date, this.state.currencies);
      return axios
        .get(url)
        .then(({ data }) => {
          if (data.success) {
            // como el api free de fixer.io no permite establecer la moneda
            // Se hace una conversion cruzada
            const excRate = 1 / data.rates.MXN;
            return {
              rates: Object.keys(data.rates).reduce((arr, key) => {
                if (key !== 'MXN') {
                  const currency = 1 / data.rates[key] / excRate;
                  return [...arr, [key, parseFloat(currency).toFixed(2)]];
                }
                return arr;
              }, []),
              error: false,
              loading: false,
              mxnRate: data.rates.MXN
            };
          }
          return {
            error: true,
            errCode: data.error.code,
            loading: false,
            rates: []
          };
        })
        .catch(() => {
          return {
            rates: [],
            error: true,
            loading: false
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
          currencies={this.state.currencies}
          base={this.state.base}
          error={this.state.error}
          errCode={this.state.errCode}
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

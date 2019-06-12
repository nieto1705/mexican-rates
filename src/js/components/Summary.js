import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Graph from './Graph.js';
import CurrencySelector from './CurrencySelector.js';
import withRates from './hocs/withRates.js';

class Summary extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="summary-container">
          <Graph
            base={this.props.base}
            rates={this.props.rates}
            loading={this.props.loading}
            deletedCurrencies={this.props.deletedCurrencies}
          />
          <CurrencySelector
            currencies={this.props.currencies}
            rates={this.props.rates}
            loading={this.props.loading}
            onAddCurrency={this.props.onAddCurrency}
            onDeleteCurrency={this.props.onDeleteCurrency}
          />
        </div>
        <div className={`load-box ${this.props.loading ? 'active' : ''}`}>Cargando</div>
        <div className={`error-box ${this.props.error ? 'active' : ''}`}>
          No se pudo cargar la información de ese dia{' '}
          {this.props.errCode ? <b>,Codigo de error: {this.props.errCode}</b> : null}
        </div>
      </React.Fragment>
    );
  }
}

Summary.propTypes = {
  base: PropTypes.string,
  rates: PropTypes.array,
  currencies: PropTypes.array,
  loading: PropTypes.bool,
  errCode: PropTypes.number,
  error: PropTypes.bool,
  onAddCurrency: PropTypes.func,
  onDeleteCurrency: PropTypes.func,
  deletedCurrencies: PropTypes.array
};

export default withRates(Summary);

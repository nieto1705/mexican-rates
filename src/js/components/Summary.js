import React from 'react';
import PropTypes from 'prop-types';
import Graph from './Graph.js';
import CurrencySelector from './CurrencySelector.js';
import withRates from './hocs/withRates.js';

const Summary = p => {
  return (
    <React.Fragment>
      <div className="summary-container">
        <Graph
          base={p.base}
          rates={p.rates}
          loading={p.loading}
          deletedCurrencies={p.deletedCurrencies}
        />
        <CurrencySelector
          currencies={p.currencies}
          rates={p.rates}
          loading={p.loading}
          onAddCurrency={p.onAddCurrency}
          onDeleteCurrency={p.onDeleteCurrency}
        />
      </div>
      <div className={`load-box ${p.loading ? 'active' : ''}`}>Cargando</div>
      <div className={`error-box ${p.error ? 'active' : ''}`}>
        No se pudo cargar la información de ese dia{' '}
        {p.errCode ? <b>,Codigo de error: {p.errCode}</b> : null}
      </div>
    </React.Fragment>
  );
};

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

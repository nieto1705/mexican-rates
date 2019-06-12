import React, { Component } from 'react';
import { supportedSymbols } from '../utils/supportedSymbols';
import PropTypes from 'prop-types';

export default class CurrencySelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editable: false,
      newCurrency: '',
      inputStatus: {
        success: true,
        msg: ''
      }
    };
    ///binds
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleInputChange(e) {
    this.setState({ newCurrency: e.target.value });
  }
  handleSubmit() {
    const { newCurrency } = this.state;
    if (!newCurrency) {
      this.setState({
        inputStatus: {
          success: false,
          msg: 'No se debe enviar un campo vacio'
        }
      });
    } else if (!supportedSymbols[newCurrency.toUpperCase().trim()]) {
      this.setState({
        inputStatus: {
          success: false,
          msg: 'No es una divisa valida'
        }
      });
    } else if (this.props.currencies.includes(newCurrency.toUpperCase().trim())) {
      this.setState({
        inputStatus: {
          success: false,
          msg: 'Ya ha agregado antes esa divisa'
        }
      });
    } else {
      this.setState({
        inputStatus: {
          success: true,
          msg: ''
        },
        newCurrency: ''
      });
      this.props.onAddCurrency(newCurrency);
    }
  }
  render() {
    const { inputStatus } = this.state;
    return (
      <div className="row">
        <div className="col s1">
          <div className="table-nav">
            <div className="add-currency">
              <div className="input-field">
                <h4>Nueva Divisa</h4>
                <input
                  value={this.state.newCurrency}
                  onChange={this.handleInputChange}
                  name="currency"
                  className={inputStatus.success ? '' : 'error'}
                  type="text"
                  placeholder="USD"
                />
                <button onClick={this.handleSubmit}>+</button>
              </div>
              <span className={`error-helper ${inputStatus.success ? '' : 'visible'}`}>
                {inputStatus.msg}
              </span>
            </div>
            <div className="edit">
              <button>Editar</button>
            </div>
          </div>
          <table>
            <thead>
              <tr className="header">
                <th>Divisa</th>
                <th>Valor en MXN</th>
                <th className="delete"></th>
              </tr>
            </thead>
            {this.props.rates.map(c => (
              <tbody key={c}>
                <tr className="field">
                  <td>{`${supportedSymbols[c[0]]} (${c[0]})`}</td>
                  <td>{c[1]}</td>
                  {this.state.editable ? <td className="delete">Eliminar</td> : <td></td>}
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    );
  }
}

CurrencySelector.propTypes = {
  rates: PropTypes.array,
  currencies: PropTypes.array,
  onAddCurrency: PropTypes.func
};

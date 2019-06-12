import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CurrencySelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editable: false
    };
  }
  render() {
    return (
      <div className="row">
        <div className="col s1">
          <div className="table-nav">
            <div className="add-currency">
              <h4>Agregar nueva Divisa</h4>
              <input type="text" placeholder="USD" />
              <button>+</button>
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
                {this.state.editable ? <th className="delete"></th> : null}
              </tr>
            </thead>
            {this.props.currencies.map(c => (
              <tbody key={c}>
                <tr className="field">
                  <td>{c[0]}</td>
                  <td>{c[1]}</td>
                  {this.state.editable ? <td className="delete">Eliminar</td> : null}
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
  currencies: PropTypes.array
};

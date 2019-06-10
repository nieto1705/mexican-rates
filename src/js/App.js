import React, { Component } from 'react';
import Graph from './components/Graph.js';

export default class App extends Component {
  render() {
    return (
      <div>
        <h1>HOLA</h1>
        <Graph date="2013-03-16" />
      </div>
    );
  }
}

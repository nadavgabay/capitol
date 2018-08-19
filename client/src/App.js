import React, { Component } from 'react';
import {FinancialTable} from './containers/financialTable.js'
import logo from './logo.svg';

import './App.css';

class App extends Component {
  state = {
    response: ''
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Table</h1>
        </header>
        <FinancialTable />
        <p className="App-intro">{this.state.response}</p>
      </div>
    );
  }
}

export default App;

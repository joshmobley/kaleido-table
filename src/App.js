import React, { Component } from 'react';
import data from './data.json';
import Table from './components/Table';

class App extends Component {

  render() {
    return (
      <Table data={data} />
    );
  }
}

export default App;

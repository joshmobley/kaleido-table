import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import axios from 'axios';
import Table from './components/Table';

class App extends Component {

  constructor() {
    super();

    this.state = {
      data: [],
      endpoint: "http://0.0.0.0:5000", // this is where we are connecting to with sockets
    }

    if( this.socket == null) {
      this.socket = socketIOClient(this.state.endpoint);
    }
  }

  fetchData() {
    axios.get(this.state.endpoint).then( res => {
      this.setState({
        data: res.data
      })
    });
  }

  componentDidMount() {
    this.fetchData();

    this.socket.on( 'change', (val) => {
      this.fetchData();
    });
  }

  render() {
    return (
      <Table data={this.state.data}  />
    );
  }
}

export default App;

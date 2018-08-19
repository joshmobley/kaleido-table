import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import data from './data.json';
import Table from './components/Table';

class App extends Component {

  constructor() {
    super();

    this.state = {
      endpoint: "http://0.0.0.0:5000", // this is where we are connecting to with sockets
    }

    this.socket = socketIOClient(this.state.endpoint);
  }

  send = () => {

    // this emits an event to the socket (your server) with an argument of 'red'
    // you can make the argument any color you would like, or any kind of data you want to send.

    this.socket.emit('change color', 'red')
    // socket.emit('change color', 'red', 'yellow') | you can have multiple arguments
  }

  render() {

    this.socket.on('change color', (color) => {
      // setting the color of our button
      console.log('event');
      document.body.style.backgroundColor = color
    })

    this.socket.emit('change color', 'red');

    return (
      <Table data={data}  />
    );
  }
}

export default App;

import React, { Component } from 'react';
import axios from 'axios';
import loremIpsum from 'lorem-ipsum';

class App extends Component {

  constructor() {
    super();

    this.state = {
      currentIndex: 1,
      endpoint: "http://localhost:5000", // this is where we are connecting to with sockets,
      editId: ''
    }
  }

  componentWillMount() {
    this.getRecordCount();
  }

  getRecordCount() {
    return axios.get(this.state.endpoint).then(res => {
      this.setState({ currentIndex: res.data.length })
    })
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  dataGenerator() {
    return {
      "label": loremIpsum({ count: 2, units: 'words' }),
      "value": loremIpsum({ count: 1, units: 'words' })
    }
  }

  sectionGenerator() {
    let data = [];
    for(let i = 1; i < this.getRandomInt(2, 4); i++) {
      data.push(this.dataGenerator());
    }

    return {
      "name": loremIpsum({ count: 3, units: 'words' }),
      "data": data
    }
  }

  objectGenerator(id) {

    let sections = [];
    for(let i = 1; i < this.getRandomInt(2, 4); i++) {
      sections.push(this.sectionGenerator());
    }

   return {
      "id": id,
      "header": loremIpsum({ count: 3, units: 'words' }),
      "netStatus": Boolean(Math.random() < 0.5),
      "logStatus": Boolean(Math.random() < 0.5),
      "vpcPublic": Boolean(Math.random() < 0.5),
      "vpcPrivate": Boolean(Math.random() < 0.5),
      "sections": sections
    }
  }

  createRecord() {
    axios.post(this.state.endpoint + '/node', this.objectGenerator(this.state.currentIndex))
      .then( res => 'node created')
      .catch( err => console.log('could not generate node'));

      this.setState({
        currentIndex: this.state.currentIndex + 1
      });
  }

  updateRecord(id) {
    axios.put(this.state.endpoint + '/node/' + id, this.objectGenerator(id))
      .then( res => console.log('node ' + id + ' updated'))
      .catch( err => console.log('could not update record'));
  }

  deleteRecords() {
    axios.delete(this.state.endpoint + '/node')
      .then( res => {
        console.log('all nodes deleted')
        this.setState({
          currentIndex: 0
        });
      })
      .catch( err => console.log('could not delete nodes'));
  }


  render() {

    return (
      <div>
        <button onClick={ (e) => this.createRecord()}>Create Node</button>
        <div className="mt-4 mb-4">
          <input
            className="mr-2"
            defaultValue={this.state.editId}
            onChange={ (e) => this.setState({ editId: e.target.value })}
            placeholder="Node ID" />
          <button onClick={ (e) => this.updateRecord(this.state.editId) }>Update Node</button>
        </div>
        <div>
          <button onClick={ (e) => this.deleteRecords() }>Delete All Nodes</button>
        </div>
      </div>
    )
  }
}

export default App;

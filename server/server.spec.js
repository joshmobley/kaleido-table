const request = require('supertest'),
      server  = require('./server'),
      sinon   = require('sinon'),
      mongoose = require('mongoose'),
      mongo = require('mongodb').MongoClient;

describe('test the root path', () => {

  beforeAll( () => {
    sinon.stub(mongoose, 'connect').yields(true);
    sinon.stub(mongo, 'connect').yields(true);
  });

  test('GET method returns a response', () => {
    request(server)
      .get('/')
      .then( res => {
        expect(res.statusCode).toBe(200);
      })
      .catch( e => console.log(e));
  });

  test('PUT method returns a response', () => {
    request(server)
      .put('/node/1')
      .then( res => {
        expect(res.statusCode).toBe(200);
      })
      .catch( e => console.log(e));
  });

  test('POST method returns a response', () => {
    request(server)
      .post('/node')
      .then( res => {
        expect(res.statusCode).toBe(200);
      })
      .catch( e => console.log(e));
  });

  test('DELETE method returns a response', () => {
    request(server)
      .delete('/node')
      .then( res => {
        expect(res.statusCode).toBe(200);
      })
      .catch( e => console.log(e));
  });

  test('DELETE method on id returns a response', () => {
    request(server)
      .delete('/node/1')
      .then( res => {
        expect(res.statusCode).toBe(200);
      })
      .catch( e => console.log(e));
  });
});

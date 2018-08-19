const express = require('express');
const http = require('http');
const mongo   = require('mongodb').MongoClient;
const socketIO = require('socket.io');

/*const dbUrl = 'mongodb://kaleido-table-db:27017/kaleido';

mongo.connect(dbUrl, (err, client) => {
  if( err ) throw err;
  var db = client.db('kaleido');
  const nodes = db.collection('nodes');
  const changeStream = nodes.watch();
  const next = await changeStream.next();
});*/

const app   = express();
const port  = process.env.PORT || 5000;

const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', socket => {
  console.log('user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`))

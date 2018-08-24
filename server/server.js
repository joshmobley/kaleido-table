const app     = require('./app/app'),
      port    = 5000,
      server  = require('http').Server(app),
      io      = require('socket.io')(server),
      mongo   = require('mongodb').MongoClient,
      mongoose= require('mongoose');

// DB SETUP

const dbUrl = 'mongodb://mongodb-primary:27017/kaleido',
      pipeline = [{ $project: { documentKey: false }}];

// connect to db via mongoose
mongoose.connect(dbUrl);

// connect to db + create change stream
mongo.connect(dbUrl).then(client => {
  const db = client.db('kaleido');

  db.createCollection("nodes");

  const collection    = db.collection('nodes'),
        changeStream  = collection.watch(pipeline);

  // monitor changes in DB and emit event on change
  changeStream.on('change', (change) => {
    console.log('db change detected');
    io.emit('change', change);
  });
});

if(!module.parent) {
  server.listen(port, () => console.log(`server listening on port ${port}`));
}

module.exports = server;

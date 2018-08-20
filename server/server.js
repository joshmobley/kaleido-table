const bodyParser  = require('body-parser'),
      express     = require('express'),
      http        = require('http'),
      mongo       = require('mongodb').MongoClient,
      mongoose    = require('mongoose')
      socketIO    = require('socket.io');

// CONFIG FOR APP

const app   = express(),
      port  = 5000
      server = http.createServer(app);

server.listen(port, () => console.log(`server listening on port ${port}`));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use( (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
  next();
});

// MONGOOSE MODELING + SETUP

const nodeSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  header: String,
  netStatus: Boolean,
  logStatus: Boolean,
  vpcPublic: Boolean,
  vpcPrivate: Boolean,
  sections: Array
});

const Node = mongoose.model("Node", nodeSchema);


// DB + SOCKET SETUP + EVENTS

const pipeline = [
  {
    $project: { documentKey: false }
  }
];

const dbUrl = 'mongodb://mongodb-primary:27017/kaleido',
      io    = socketIO(server);

  // connect to DB w/ mongoose
  mongoose.connect(dbUrl);

  // connect to db + create change stream
  mongo.connect(dbUrl).then(client => {
    const db = client.db('kaleido');
    db.createCollection("nodes");
    const collection = db.collection('nodes');
    const changeStream = collection.watch(pipeline);

    changeStream.on('change', (change) => {
      console.log('db change detected');
      io.emit('change', change);
    });


    io.on('connect', (socket) => {
      console.log('socket created');

      io.on('disconnect', () =>{
        console.log('socket destroyed');
      });

    });

});

// ROUTES + OPERATIONS

app.get("/", (req, res) => {
  Node.find((err, nodes) => {
    res.send(nodes);
  });
});

app.post("/node", (req, res) => {
  console.log(req.body);
  var data = new Node(req.body);
  data.save().then( item => {
    res.send("node saved");
  })
  .catch( err => {
    res.status(400).send('unable to save to db');
  });
});

app.put("/node/:id", (req, res) => {
  var nodeToUpdate = Node.find({id: req.params.id });
  nodeToUpdate.update(req.body).then( () => {
    res.send('node ' + req.params.id + ' updated');
  })
  .catch( err => {
    res.status(400).send('unable to update node ' + req.params.id);
  })
})

app.delete("/node/:id", (req, res) => {
  var nodeToDelete = Node.find({id: req.params.id });
  nodeToDelete.remove().then( () => {
    res.send("node " + req.params.id + " removed");
  })
  .catch( err => {
    res.status(400).send('unable to remove node ' + req.params.id);
  });
})

app.delete("/node", (req, res) => {
  Node.find().remove().then( () => {
    res.send("all nodes removed");
  })
  .catch( err => {
    res.status(400).send('cannot delete all nodes');
  })
})

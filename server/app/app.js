const bodyParser  = require('body-parser'),
      express     = require('express'),
      Node        = require('./models/Node');

// EXPRESS CONFIG + ROUTING

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use( (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
  next();
});

app.get("/", (req, res) => {
  Node.find((err, nodes) => {
    res.send(nodes);
  });
});

app.post("/node", (req, res) => {
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
  });
});

app.delete("/node/:id", (req, res) => {
  var nodeToDelete = Node.find({id: req.params.id });
  nodeToDelete.remove().then( () => {
    res.send("node " + req.params.id + " removed");
  })
  .catch( err => {
    res.status(400).send('unable to remove node ' + req.params.id);
  });
});

app.delete("/node", (req, res) => {
  Node.find().remove().then( () => {
    res.send("all nodes removed");
  })
  .catch( err => {
    res.status(400).send('cannot delete all nodes');
  });
});

module.exports = app;

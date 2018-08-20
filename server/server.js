const express = require('express');
const mongo   = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const dbUrl = 'mongodb://mongodb-primary:27017';

const pipeline = [
  {
    $project: { documentKey: false }
  }
];

mongo.connect(dbUrl).then(client => {
  console.log('connected to db server');
  const db = client.db('kaleido');
  db.createCollection("nodes");
  const collection = db.collection('nodes');
  const changeStream = collection.watch(pipeline);
  // start listen to changes
      changeStream.on("change", function(change) {
        console.log(change);
      });
});



const app = express();
const port = 5000;

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
})

mongoose.connect(dbUrl + '/kaleido');

var nodeSchema = new mongoose.Schema({
  id: String,
  header: String,
  netStatus: Boolean,
  logStatus: Boolean,
  vpcPublic: Boolean,
  vpcPrivate: Boolean,
  sections: Array
});

var Node = mongoose.model("Node", nodeSchema);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  Node.find((err, nodes) => {

    console.log(nodes);
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

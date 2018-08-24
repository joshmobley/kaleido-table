const mongoose = require('mongoose');

// MONGOOSE MODELING + SETUP

const nodeSchema = new mongoose.Schema({
        id: { type: String, unique: true },
        header: String,
        netStatus: Boolean,
        logStatus: Boolean,
        vpcPublic: Boolean,
        vpcPrivate: Boolean,
        sections: Array
      }),
      Node = mongoose.model("Node", nodeSchema);


module.exports = Node;

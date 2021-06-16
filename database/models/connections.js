const mongoose = require('mongoose');

const { Schema } = mongoose;

const ConnectionsSchema = new Schema({
  sender: {
    type: String,
    required: false,
  },
  recipient: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    required: false,
  },
  chatLog: {
    type: Array,
    required: false,
  },
});

module.exports = mongoose.model('Connections', ConnectionsSchema);

const mongoose = require('mongoose');

const { Schema } = mongoose;

const TestSchema = new Schema({
  name: { type: String, required: true },
  text: String,
});

module.exports = mongoose.model('testDbItem', TestSchema);

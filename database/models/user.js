const mongoose = require('mongoose');

const { Schema } = mongoose;

const CustomerSchema = new Schema({
  stripeId: {
    type: String,
    required: true,
  },
  subscriptionTierId: {
    type: String,
    required: false,
  },
  subscribedDates: {
    type: Date,
    required: false,
  },
  defaultPaymentId: {
    type: String,
    required: false,
  },
});

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  customer: {
    type: CustomerSchema,
    default: null,
    required: false,
  },
});

module.exports = mongoose.model('Customer', CustomerSchema);

module.exports = mongoose.model('User', UserSchema);

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

const SettingsSchema = new Schema({
  mentorMentee: {
    type: Object,
    required: true,
  },
  days: {
    type: Object,
    required: true,
  },
  time: {
    type: Object,
    required: true,
  },
  avatar: {
    type: Array,
    required: true,
  },
  interests: {
    type: Array,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
});
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
});

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
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
  settings: {
    type: SettingsSchema,
    defualt: null,
    required: false,
  },
});

module.exports = mongoose.model('Customer', CustomerSchema);
module.exports = mongoose.model('Settings', SettingsSchema);
module.exports = mongoose.model('User', UserSchema);

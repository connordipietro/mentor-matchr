const mongoose = require('mongoose');

const { Schema } = mongoose;

const BannerSchema = new Schema({
  bannerMsg: {
    type: String,
    required: true,
  },
  expirationDate: {
    type: Date,
    expires: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Banner', BannerSchema);

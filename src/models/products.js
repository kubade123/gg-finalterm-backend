const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  price: {
    required: true,
    type: Number,
  },
  productLink: {
    required: true,
    type: String,
  },
  description: {
    required: false,
    type: String,
  },
  video: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Video',
  },
});

module.exports = mongoose.model('Product', productSchema);

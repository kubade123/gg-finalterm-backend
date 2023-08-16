const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: {
    required: false,
    type: String,
  },
  thumbnailURL: {
    required: false,
    type: String,
  },
  category: {
    required: false,
    type: String,
  },
  description: {
    required: false,
    type: String,
  },
  comments: [
    {
      username: { type: String, required: true },
      comment: { type: String, required: true },
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model('Video', videoSchema);

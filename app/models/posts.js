let mongoose = require('mongoose');

let postsSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  s3Bucket: {
    type: String,
    required: true
  },
  objectKey: {
    type: String,
    required: true
  },
  caption: {
    type: String,
    required: true,
    default: "No caption"
  },
  createdAt: {
    type: String,
    required: true,
    immutable: true,
    default: () => Date.now()
  },
  updatedAt: {
    type: String,
    required: true,
    default: () => Date.now()
  }
});

module.exports = mongoose.model('Posts', postsSchema);

const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const CommentSchema = new Schema({
  title: String,
  description: String,
  user: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = model('Comment', CommentSchema);
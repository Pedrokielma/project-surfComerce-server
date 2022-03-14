const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const CommentSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    content: String
  },
  {
    timestamps: true
  }
);

module.exports = model('Comment', CommentSchema);






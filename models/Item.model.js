const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const ItemSchema = new Schema({
  title: String,
  description: String,
  image: String,
  category: String,
  price: String,
  // size: { type: Schema.Types.ObjectId,
  // },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  comments:[{ type: Schema.Types.ObjectId, ref: 'Comment' }],
});

module.exports = model('Item', ItemSchema);
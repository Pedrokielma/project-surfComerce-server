const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const ItemSchema = new Schema({
  title: String,
  description: String,
  image: String,
  category: String,
  // size: { type: Schema.Types.ObjectId,
  // },
  user: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = model('Item', ItemSchema);
const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    name: {
      type: String
    },
    email: {
      type: String,
      // unique: true -> Ideally, should be unique, but its up to you
    },
    password: String,
    googleID: String,
    items:[{ type: Schema.Types.ObjectId, ref: 'Item' }],
    favitems:[{ type: Schema.Types.ObjectId, ref: 'Item' }],
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;

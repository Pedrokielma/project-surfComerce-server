const router = require('express').Router();
const mongoose = require('mongoose');
const User = require('../models/User.model');
const Item = require('../models/Item.model');
const Comment = require('../models/Comment.model');
const { isAuthenticated } = require('../middleware/jwt.middleware');


// router.get('/:userId', (req, res, next) => {
//   const { userId } = req.params;

//     User.findById(userId)
//       .populate('items')
//       .then((response) => res.json(response))
//       .catch((err) => res.json(err));
//   });

router.post('/items/:itemId', isAuthenticated, async (req, res, next) => {
    const { user, content } = req.body;
    const { itemId } = req.params;
  
    const creator = await User.findById(user)

    // const creator = User.findById(req.payload._id)
    // .then((response) => res.json(response.items))
    // .catch((err) => res.json(err));

    Comment.create({ user: creator, content })
    .then((newComment) => {
        return Item.findByIdAndUpdate( itemId, { $push: { comments: newComment._id } }, { new: true });
      })
      .then((response) => res.json(response))
      .catch((err) => next(err));
  });




//   router.post('/items', async (req, res, next) => {
//     const { title, description, image, category, price, user } = req.body;
  
//     const creator = await User.findById(user)

//     Item.create({ title, description, image, category, price, user: creator })
//     .then((newItem) => {
//         return User.findByIdAndUpdate(user, { $push: { items: newItem._id } }, { new: true });
//       })
//       .then((response) => res.json(response))
//       .catch((err) => next(err));
//   });



  

//   router.get('/items/:itemId', (req, res, next) => {
//     const { itemId } = req.params;
  
//     if (!mongoose.Types.ObjectId.isValid(itemId)) {
//       res.status(400).json({ message: 'Specified Id is not valid' });
//       return;
//     }
  
//     Item.findById(itemId)
//       .populate('user')
//       .then((response) => res.json(response))
//       .catch((err) => res.json(err));
//   });

  module.exports = router;
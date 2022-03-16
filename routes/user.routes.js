const router = require('express').Router();
const mongoose = require('mongoose');
const User = require('../models/User.model');
const Item = require('../models/Item.model');
const { isAuthenticated } = require('../middleware/jwt.middleware');


// router.get('/:userId', (req, res, next) => {
//   const { userId } = req.params;

//     User.findById(userId)
//       .populate('items')
//       .then((response) => res.json(response))
//       .catch((err) => res.json(err));
//   });

  router.get('/myadds', isAuthenticated, (req, res, next) => {
  
      User.findById(req.payload._id)
        .populate("items, favorites")
        .then((response) => res.json(response.items))
        .catch((err) => res.json(err));
    });


    router.put('/favorite/:itemId', async (req, res, next) => {
      const { itemId } = req.params;
  
      Item.findByIdAndUpdate(itemId, req.body, { new: true })
      .then((newItem) => {
          return User.findByIdAndUpdate(req.payload._id, { $push: { favitems: newItem._id } }, { new: true });
        })
        .then((response) => res.json(response))
        .catch((err) => next(err));
    });

    
  

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
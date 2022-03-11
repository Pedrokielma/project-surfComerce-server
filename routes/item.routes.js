const router = require('express').Router();
const mongoose = require('mongoose');
const User = require('../models/User.model');
const Item = require('../models/Item.model');


router.post('/items', (req, res, next) => {
    const { title, description, image, category, user } = req.body;
  
    Item.create({ title, description, image, category, user })
    .then((newItem) => {
        return User.findByIdAndUpdate(user, { $push: { items: newItem._id } }, { new: true });
      })
      .then((response) => res.json(response))
      .catch((err) => next(err));
  });

  router.get('/Items', (req, res, next) => {
    Item.find()
      .populate('user')
      .then((response) => res.json(response))
      .catch((err) => res.json(err));
  });

router.get('/items/:itemId', (req, res, next) => {
  const { itemId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    res.status(400).json({ message: 'Specified Id is not valid' });
    return;
  }

  Item.findById(itemId)
    .populate('user')
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});


  module.exports = router;

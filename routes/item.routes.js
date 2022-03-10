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


  module.exports = router;

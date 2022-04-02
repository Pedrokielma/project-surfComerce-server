const router = require('express').Router();
const mongoose = require('mongoose');
const User = require('../models/User.model');
const Item = require('../models/Item.model');
// import { AuthContext } from '../../context/auth.context';


router.post('/items', async (req, res, next) => {
    const { title, description, image, category, price, user } = req.body;
  
    const creator = await User.findById(user)

    Item.create({ title, description, image, category, price, user: creator })
    .then((newItem) => {
        return User.findByIdAndUpdate(user, { $push: { items: newItem._id } }, { new: true });
      })
      .then((response) => res.json(response))
      .catch((err) => next(err));
  });

  router.get('/items', (req, res, next) => {
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
    .populate('user comments')
    .then((response) => res.json(response))
    .catch((err) => res.json(err));

});


router.put('/items/:itemId', (req, res, next) => {
  const { itemId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    res.status(400).json({ message: 'Specified Id is not valid' });
    return;
  }

  Item.findByIdAndUpdate(itemId, req.body, { new: true })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

router.delete('/items/:itemId', (req, res, next) => {
  const { itemId } = req.params;
Item
  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    res.status(400).json({ message: 'Specified Id is not valid' });
    return;
  }
  Item.findByIdAndRemove(itemId)
    .then(() => res.json({ message: `Item with ${itemId} was removed successfully` }))
    .catch((err) => res.json(err));
});
// router.get('/items/', (req, res, next) => {

// })


  module.exports = router;

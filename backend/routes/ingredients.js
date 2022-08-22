const router = require('express').Router();
let Ingredient = require('../models/ingredient.model');

router.route('/').get((req, res) => {
  Ingredient.find()
    .then(field => res.json(field))
    .catch(err => res.status(400).json('Error: ' + err));
});

//router.route('/add').post((req, res) => {
//  const username = req.body.username;
//
//  const newUser = new User({username});
//
//  newUser.save()
//    .then(() => res.json('User added!'))
//    .catch(err => res.status(400).json('Error: ' + err));
//});

module.exports = router;

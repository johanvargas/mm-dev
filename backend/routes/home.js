const router = require('express').Router();
let Entity = require('../models/entity.model');

router.route('/').get((req, res) => {
  Entity.find({})
    .then(ent => res.json(ent))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;

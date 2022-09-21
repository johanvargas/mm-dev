const router = require('express').Router();
let Ingredient = require('../models/ingredient.model');

router.route('/').get((req, res) => {
  Ingredient.find()
    .then(field => res.json(field))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/create').post((req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const serving = Number(req.body.serving);
  const unit = req.body.unit;

  const newIngredient = new Ingredient({
    name,
    description,
    serving,
    unit
  });

  newIngredient.save()
    .then(() => res.json('Ingredient added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/count').get((req, res) => {
  Ingredient.count()
    .then(field => res.json(field))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Ingredient.findById(req.params.id)
    .then( item => res.json(item))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/text/:name').get((req, res) => {
  Ingredient.find({ "name": req.params.name})
    .then( item => {
      res.json(item)
      console.log( "item is : ", item);
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/delete/:id').delete((req, res) => {
  Ingredient.findByIdAndDelete(req.params.id)
    .then(() => res.json('ingredient deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Ingredient.findById(req.params.id)
    .then(ingredient => {
      ingredient.name = req.body.name; 
      ingredient.description = req.body.description;
      ingredient.serving = Number(req.body.serving);
      ingredient.unit = req.body.unit;

      ingredient.save()
        .then(() => res.json('ingredient updated.'))
        .catch(err => res.status(400).json("Error: "+ err));
      })
    .catch(err => res.status(400).json('Error: ' + err));
});


// Aggregates 

module.exports = router;

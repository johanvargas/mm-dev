const router = require('express').Router();
let Ingredient = require('../models/ingredient.model');

router.route('/').get((req, res) => {
  Ingredient.find()
    .then(field => res.json(field))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const name = req.body.name;

  const newIngredient = new Ingredient({name});

  newIngredient.save()
    .then(() => res.json('Ingredient added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Ingredient.findById(req.params.id)
    .then( items => res.json(items))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/delete/:id').delete((req, res) => {
  Ingredient.findByIdAndDelete(req.params.id)
    .then(() => res.json('recipe deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Ingredient.findById(req.params.id)
    .then(recipe => {
      recipe.name = req.body.name; 
      recipe.description = req.body.description;
      recipe.duration = Number(req.body.serving);
      recipe.ingredients = req.body.unit;

      recipe.save()
        .then(() => res.json('recipe updated.'))
        .catch(err => res.status(400).json("Error: "+ err));
      })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;

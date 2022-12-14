const router = require('express').Router();
let Recipe = require('../models/recipe.model');

router.route('/').get((req, res) => {
  Recipe.find()
    .then(items => res.json(items))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/create').post((req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const ingredients = req.body.ingredients;
  const notes = req.body.notes;

  const newRecipe = new Recipe({
    name, 
    description,
    duration,
    ingredients,
    notes
  });

  newRecipe.save()
    .then(() => res.json('Recipe added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/count').get((req, res) => {
  Recipe.count()
    .then(field => res.json(field))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Recipe.findById(req.params.id)
    .then( items => res.json(items))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/delete/:id').delete((req, res) => {
  Recipe.findByIdAndDelete(req.params.id)
    .then(() => res.json('recipe deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Recipe.findById(req.params.id)
    .then(recipe => {
      recipe.name = req.body.name; 
      recipe.description = req.body.description;
      recipe.duration = Number(req.body.duration);
      recipe.ingredients = Array(req.body.ingredients);
      recipe.notes = req.body.notes;

      recipe.save()
        .then(() => res.json('recipe updated.'))
        .catch(err => res.status(400).json("Error: "+ err));
      })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;

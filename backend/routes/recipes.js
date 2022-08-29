const router = require('express').Router();
let Recipe = require('../models/recipe.model');

router.route('/').get((req, res) => {
  Recipe.find()
    .then(items => res.json(items))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const ingredients = Array(req.body.ingredients)

  const newRecipe = new Recipe({
    name, 
    description,
    duration,
    ingredients,
  });

  newRecipe.save()
    .then(() => res.json('recipe added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Recipe.findById(req.params.id)
    .then( items => res.json(items))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Recipe.findByIdAndDelete(req.params.id)
    .then(() => res.json('recipe deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Recipe.findById(req.params.id)
    .then(recipe => {
      recipe.name = req.body.username; 
      recipe.description = req.body.description;
      recipe.duration = Number(req.body.duration);
      recipe.ingredients = Array(req.body.ingredients);

      recipe.save()
        .then(() => res.json('recipe updated.'))
        .catch(err => res.status(400).json("Error: "+ err));
      })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;

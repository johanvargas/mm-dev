const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ingredientSchema = new Schema({
  // fields not done yet!!
  name: { type: String, required: true },
  description: { type: String, required: true },
  serving: { type: Number, required: true },
  unit: { type: String, required: true }
}, {
  timestamps: true,
});

const Ingredient = mongoose.model('Ingredient', ingredientSchema);

module.exports = Ingredient;

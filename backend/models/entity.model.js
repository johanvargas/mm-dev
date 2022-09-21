const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const entitySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  address: { type: String },
  type: {type: String},
  hours: {type: String},
  description: {type: String},
  owner: {type: String},
  employees: {type: Array},
  burger_of_the_day: {type: String}
}, {
  timestamps: true,
});

const Entity = mongoose.model('Entity', entitySchema, 'entity');

module.exports = Entity;

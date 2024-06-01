// models/householdModel.js
const mongoose = require('mongoose');

const householdSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Household = mongoose.model('Household', householdSchema);

module.exports = Household;

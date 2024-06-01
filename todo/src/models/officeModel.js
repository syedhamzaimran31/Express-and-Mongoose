// models/officeModel.js
const mongoose = require('mongoose');

const officeSchema = new mongoose.Schema({
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

const Office = mongoose.model('Office', officeSchema);

module.exports = Office;

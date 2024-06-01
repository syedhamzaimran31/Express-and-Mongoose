// models/educationModel.js
const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
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

const Education = mongoose.model('Education', educationSchema);

module.exports = Education;

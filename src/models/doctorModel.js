const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    required: true,
  },

  mobile: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  degree: {
    type: String,
    required: true,
    trim: true
  },
  experience: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    required: true
  }
  ,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.models.Doctor || mongoose.model('Doctor', doctorSchema);
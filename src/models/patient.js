const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true
  },
  patientNo: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true
  },
  mobile: {
    type: String,
    required: true
  },
  shift: {
    type: String,
    required: true
  },
  appointed: {
    type: Boolean,
    default: false,
    required: true
  },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.patient || mongoose.model('patient', patientSchema);

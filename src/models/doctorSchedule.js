const mongoose = require('mongoose');

const doctorScheduleSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true
  },
  shifts: {
    morning: {
      startTime: { type: String, required: true, default: "" }, // e.g., "09:00 AM"
      endTime: { type: String, required: true, default: "" }, // e.g., "12:00 PM"
    },
    evening: {
      startTime: { type: String, required: true, default: "" }, // e.g., "09:00 AM"
      endTime: { type: String, required: true, default: "" }, // e.g., "12:00 PM"
    }
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.models.DoctorSchedule || mongoose.model('DoctorSchedule', doctorScheduleSchema);
const mongoose = require('mongoose');

const doctorScheduleSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true
  },
  shifts: [
    {
      startTime: { type: String, required: true }, // e.g., "09:00 AM"
      endTime: { type: String, required: true }, // e.g., "12:00 PM"
    }
  ],
  status: {
    type: String,
    required: true,
    enum: ['Available', 'Unavailable'],
    default: 'Available'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.models.DoctorSchedule || mongoose.model('DoctorSchedule', doctorScheduleSchema);
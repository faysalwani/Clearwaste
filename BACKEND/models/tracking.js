const mongoose = require('mongoose');

const trackingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  trackingNumber: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  status: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Tracking', trackingSchema);

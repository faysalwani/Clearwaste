const Tracking = require('../models/tracking');

// Create a tracking record
exports.createTrackingRecord = async (req, res) => {
  const { userId, trackingNumber, date, location, status } = req.body;
  try {
    const trackingRecord = new Tracking({ userId, trackingNumber, date, location, status });
    await trackingRecord.save();
    res.status(201).json({ message: 'Tracking record created successfully', trackingRecord });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all tracking records for a user
exports.getTrackingRecordsByUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const trackingRecords = await Tracking.find({ userId });
    res.status(200).json(trackingRecords);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get tracking record by tracking number
exports.getTrackingRecordByTrackingNumber = async (req, res) => {
  const { trackingNumber } = req.params;
  try {
    const trackingRecord = await Tracking.findOne({ trackingNumber });
    if (!trackingRecord) {
      return res.status(404).json({ message: 'Tracking record not found' });
    }
    res.status(200).json(trackingRecord);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const express = require('express');
const { createTrackingRecord, getTrackingRecordsByUser, getTrackingRecordByTrackingNumber } = require('../controllers/trackingController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/create', auth, createTrackingRecord);
router.get('/user/:userId', auth, getTrackingRecordsByUser);
router.get('/:trackingNumber', auth, getTrackingRecordByTrackingNumber);

module.exports = router;

const express = require('express');
const { createServiceRequest, getServiceRequestsByUser, getServiceRequestById } = require('../controllers/serviceController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/create', auth, createServiceRequest);
router.get('/user/:userId', auth, getServiceRequestsByUser);
router.get('/:id', auth, getServiceRequestById);

module.exports = router;

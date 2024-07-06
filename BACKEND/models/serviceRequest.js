const mongoose = require('mongoose');

const serviceRequestSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    serviceType: {
        type: String,
        required: true,
    },
    serviceDuration: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    trackingId: {
        type: String,
        required: true,
        unique: false,
    },
});

const ServiceRequest = mongoose.model('ServiceRequest', serviceRequestSchema);

module.exports = ServiceRequest;

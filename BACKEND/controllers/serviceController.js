const nodemailer = require('nodemailer');
const ServiceRequest = require('../models/serviceRequest');
const User = require('../models/user');
require('dotenv').config();

// Create a service request
const createServiceRequest = async (req, res) => {
    try {
        const { userId, name, serviceType, serviceDuration, phone } = req.body;
        const trackingId = process.env.TRACKING_ID;

        const newServiceRequest = await ServiceRequest.create({
            userId,
            name,
            serviceType,
            serviceDuration,
            phone,
            trackingId,
        });

        // Send email to driver
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.DRIVER_EMAIL,
            subject: 'New Service Request',
            text: `A new service request has been made by ${name}. Details:\n\nService Type: ${serviceType}\nService Duration: ${serviceDuration}\nPhone: ${phone}\nTracking ID: ${trackingId}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });

        res.status(201).json({
            message: "Service request created successfully",
            trackingId: newServiceRequest.trackingId,
        });
    } catch (error) {
        console.error("Error creating service request:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get all service requests for a user
const getServiceRequestsByUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const serviceRequests = await ServiceRequest.find({ userId });
        res.status(200).json(serviceRequests);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get service request by ID
const getServiceRequestById = async (req, res) => {
    const { id } = req.params;
    try {
        const serviceRequest = await ServiceRequest.findById(id);
        if (!serviceRequest) {
            return res.status(404).json({ message: 'Service request not found' });
        }
        res.status(200).json(serviceRequest);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    createServiceRequest,
    getServiceRequestsByUser,
    getServiceRequestById,
};

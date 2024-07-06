require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const verifyToken = require('./middleware/auth-tracking');

const userRoutes = require('./routes/auth');
const serviceRoutes = require('./routes/service');
const trackingRoutes = require('./routes/tracking');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use('/api/auth', authRoutes);

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Log environment variables for debugging
console.log('TRACKING_ID from .env:', process.env.TRACKING_ID);

// Tracking ID verification
app.get('/api/track/:trackingId', verifyToken, (req, res) => {
    const { trackingId } = req.params;
    console.log('Received trackingId:', trackingId);

    // Check if the tracking ID matches the one in the environment variable
    const expectedTrackingId = process.env.TRACKING_ID;
    if (trackingId === expectedTrackingId) {
        res.status(200).json({ trackingUrl: expectedTrackingId });
    } else {
        console.log('Tracking ID not found.');
        res.status(404).json({ message: 'Tracking ID not found.' });
    }
});

// Routes
app.use('/api/auth', userRoutes);
app.use('/api/service', serviceRoutes);
app.use('/api/tracking', trackingRoutes);

// Database connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

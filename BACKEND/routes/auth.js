const express = require('express');
const { signup, login, forgotPassword, verifyOtp, verifyResetOtp, resetPassword, getUserDetails, updateUser, deleteUser } = require('../controllers/userController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/verify-otp', verifyOtp);
router.post('/verify-reset-otp', verifyResetOtp);
router.post('/reset-password', resetPassword);
router.get('/user/:id', auth, getUserDetails);
router.put('/user/:id', updateUser);
router.delete('/user/:id', deleteUser);

module.exports = router;



/*const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


/*const { sendOtp, verifyOtpAndRegister, loginUser, forgotPassword, verifyOtpAndResetPassword } = require('../controllers/userController');
const router = express.Router();

const express = require('express');
const { signup, login, forgotPassword, verifyOtp, verifyResetOtp, resetPassword } = require('../controllers/userController');

const router = express.Router();



module.exports = router;

function generateOTP() {
  return crypto.randomInt(100000, 999999).toString();
}

function sendOTP(email, otp, type) {
  const subject = type === 'signup' ? 'OTP for Signup' : 'OTP for Password Reset';
  const text = type === 'signup' ?
      `Your OTP for signup is ${otp}. Do not share this OTP with anyone. If you did not request this, please contact us.` :
      `Your OTP for password reset is ${otp}. Do not share this OTP with anyone. If you did not request this, please contact us.`;

  const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: subject,
      text: text
  };

  return transporter.sendMail(mailOptions);
}

router.post('/signup', async (req, res) => {
  const { name, email, password, address } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const otp = generateOTP();
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      address,
      otp,
      isVerified: false
    });

    await newUser.save();
    await sendOTP(email, otp, 'signup');

    res.status(200).json({ message: 'OTP sent to email' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    user.verified = true;
    user.otp = null;
    await user.save();

    res.status(200).json({ message: 'User verified successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    if (!user.verified) {
      return res.status(400).json({ message: 'User not verified' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


router.post('/signup', signup);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/verify-otp', verifyOtp);
router.post('/verify-reset-otp', verifyResetOtp);
router.post('/reset-password', resetPassword);

module.exports = router; 
*/



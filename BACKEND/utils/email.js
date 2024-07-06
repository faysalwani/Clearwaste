const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

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

module.exports = { sendOTP };

const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendRegistrationEmail = async (to, firstName) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Thank you for registering to Nexus!',
    text: `Hi ${firstName},\n\nThank you for registering at Nexus! We're excited to have you onboard.\n\nBest Regards,\nThe Nexus Team`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Registration email sent successfully');
  } catch (error) {
    console.error('Error sending registration email:', error.message);
  }
};

module.exports = { sendRegistrationEmail };

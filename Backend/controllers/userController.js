const User = require('../models/User');
const { sendRegistrationEmail } = require('../utils/mailer');

exports.register = async (req, res) => {
  const { firstName, lastName, dob, grade, school, personalNumber, parentNumber, email, marksheetURL } = req.body;

  try {
    const user = await User.create({ firstName, lastName, dob, grade, school, personalNumber, parentNumber, email, marksheetURL });
    
    await sendRegistrationEmail(email, firstName);

    res.status(201).json({ message: 'User registered successfully' }); 
  } catch (error) {
    console.error('Error during registration:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

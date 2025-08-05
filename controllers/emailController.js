const Email = require('../models/emailModel');

exports.storeEmail = async (req, res) => {
  console.log('Incoming request body:', req.body); // ✅ Debug log

  const { address } = req.body;

  if (!address || !address.includes('@')) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  console.log('Passed validation, entering try block'); // ✅ Confirm entry

  try {
    const newEmail = new Email({ address });
    await newEmail.save();
    res.status(201).json({ message: 'Email stored successfully' });
  } catch (error) {
    console.error('Error saving email:', error); // ✅ Log actual error
    if (error.code === 11000) {
      res.status(409).json({ error: 'Email already exists' });
    } else {
      res.status(500).json({ error: 'Server error' });
    }
  }
};
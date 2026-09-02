const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { users, pendingRegistrations } = require('../utils/mockDB');

// Simple ID generator for mock DB
const generateId = () => Math.random().toString(36).substr(2, 9);

exports.registerRequest = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Generate a 6-digit OTP code
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Store the pending registration
    const existingPendingIndex = pendingRegistrations.findIndex(p => p.email === email);
    if (existingPendingIndex !== -1) {
      pendingRegistrations.splice(existingPendingIndex, 1);
    }

    pendingRegistrations.push({
      name,
      email,
      password,
      role,
      otp,
      createdAt: new Date()
    });

    // Log the OTP code to the console for testing
    console.log(`[OTP Verification] Email: ${email} | Generated OTP: ${otp}`);

    // Send the response with the OTP included (for easy mock debugging in frontend)
    res.status(200).json({
      message: 'OTP sent to email. Please verify.',
      email,
      mockOtp: otp // Send it in response so frontend can show/use it for easy local testing
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Find pending registration
    const pending = pendingRegistrations.find(p => p.email === email && p.otp === otp);
    if (!pending) {
      return res.status(400).json({ message: 'Invalid OTP or email' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(pending.password, salt);

    // Create verified user
    const newUser = {
      _id: generateId(),
      name: pending.name,
      email: pending.email,
      password: hashedPassword,
      role: pending.role || 'beginner',
      location: '',
      soilType: '',
      landSize: '',
      savedCrops: []
    };

    users.push(newUser);

    // Remove from pending registrations
    const pendingIndex = pendingRegistrations.findIndex(p => p.email === email);
    if (pendingIndex !== -1) {
      pendingRegistrations.splice(pendingIndex, 1);
    }

    // Create token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET || 'secret', {
      expiresIn: '7d'
    });

    res.status(201).json({
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during OTP verification' });
  }
};


exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user exists
    let user = users.find(u => u.email === email);
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    user = {
      _id: generateId(),
      name,
      email,
      password: hashedPassword,
      role: role || 'beginner',
      location: '',
      soilType: '',
      landSize: '',
      savedCrops: []
    };

    users.push(user);

    // Create token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret', {
      expiresIn: '7d'
    });

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret', {
      expiresIn: '7d'
    });

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

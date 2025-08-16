const jwt = require('jsonwebtoken');
const User = require('../models/User');

function generateToken(user) {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
}

function sanitizeUser(userDoc) {
  const user = userDoc.toObject ? userDoc.toObject() : userDoc;
  delete user.password;
  return user;
}

async function signupClient(req, res) {
  try {
    const { name, email, password, phone, location, agreedToTerms } = req.body;
    if (!agreedToTerms) return res.status(400).json({ message: 'You must accept the terms to continue' });
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email already in use' });
    const user = await User.create({ role: 'client', name, email, password, phone, location, agreedToTerms: true });
    const token = generateToken(user);
    res.status(201).json({ token, user: sanitizeUser(user) });
  } catch (err) {
    const status = err?.name === 'ValidationError' ? 400 : 500;
    res.status(status).json({ message: err.message });
  }
}

async function signupArtist(req, res) {
  try {
    const {
      name,
      email,
      password,
      phone,
      location,
      services = [],
      pricing = {},
      photos = [],
      video,
      socialLinks = {},
      availableForTravel = false,
      agreedToTerms,
    } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email already in use' });

    if (!agreedToTerms) return res.status(400).json({ message: 'You must accept the terms to continue' });

    // If coming with uploads
    const uploadedPhotos = Array.isArray(req.files?.photos)
      ? req.files.photos.map((f) => `/uploads/${f.filename}`)
      : photos;
    const uploadedVideo = Array.isArray(req.files?.video) && req.files.video[0]
      ? `/uploads/${req.files.video[0].filename}`
      : video;

    const user = await User.create({
      role: 'artist',
      name,
      email,
      password,
      phone,
      location,
      services,
      pricing,
      photos: uploadedPhotos,
      video: uploadedVideo,
      socialLinks,
      availableForTravel,
      agreedToTerms: Boolean(agreedToTerms),
    });
    const token = generateToken(user);
    res.status(201).json({ token, user: sanitizeUser(user) });
  } catch (err) {
    const status = err?.name === 'ValidationError' ? 400 : 500;
    res.status(status).json({ message: err.message });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const match = await user.comparePassword(password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });
    const token = generateToken(user);
    res.json({ token, user: sanitizeUser(user) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function me(req, res) {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ user: sanitizeUser(user) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = { signupClient, signupArtist, login, me };



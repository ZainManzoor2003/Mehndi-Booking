const User = require('../models/User');

async function getMe(req, res) {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    const u = user.toObject();
    delete u.password;
    res.json({ user: u });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function createUser(req, res) {
  try {
    const {
      role,
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

    if (!['client', 'artist'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }
    if (!agreedToTerms) return res.status(400).json({ message: 'You must accept the terms to continue' });

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email already in use' });

    const uploadedPhotos = Array.isArray(req.files?.photos)
      ? req.files.photos.map((f) => `/uploads/${f.filename}`)
      : photos;
    const uploadedVideo = Array.isArray(req.files?.video) && req.files.video[0]
      ? `/uploads/${req.files.video[0].filename}`
      : video;

    const user = await User.create({
      role,
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

    const u = user.toObject();
    delete u.password;
    res.status(201).json({ user: u });
  } catch (err) {
    const status = err?.name === 'ValidationError' ? 400 : 500;
    res.status(status).json({ message: err.message });
  }
}

module.exports = { getMe, createUser };



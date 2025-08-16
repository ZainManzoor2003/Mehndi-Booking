const express = require('express');
const { getMe, createUser } = require('../controllers/userController');
const { protect } = require('../middleware/auth');
const { upload } = require('../utils/upload');

const router = express.Router();

// GET /api/user/me - return authenticated user's profile
router.get('/me', protect, getMe);

// Admin-style create user (or open endpoint if you want public creation through this route)
// Accepts multipart form with photos[] and optional video
router.post(
  '/',
  (req, res, next) => {
    // Normalize field names so both photos and photos[] work
    const fields = [
      { name: 'photos', maxCount: 10 },
      { name: 'photos[]', maxCount: 10 },
      { name: 'video', maxCount: 1 },
    ];
    return upload.fields(fields)(req, res, next);
  },
  createUser
);

module.exports = router;



const express = require('express');
const { signupClient, signupArtist, login, me } = require('../controllers/authController');
const { upload } = require('../utils/upload');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/signup-client', signupClient);
router.post(
  '/signup-artist',
  upload.fields([
    { name: 'photos', maxCount: 10 },
    { name: 'video', maxCount: 1 },
  ]),
  signupArtist
);
router.post('/login', login);
router.get('/me', protect, me);

module.exports = router;



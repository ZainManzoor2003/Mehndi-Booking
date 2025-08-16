const express = require('express');
const { createBooking, getBookings } = require('../controllers/bookingController');
const { protect, optionalAuth } = require('../middleware/auth');
const { authorizeRoles } = require('../middleware/roles');
const { upload } = require('../utils/upload');

const router = express.Router();

// Public booking creation (optionally authenticated client)
router.post(
  '/',
  optionalAuth,
  upload.fields([{ name: 'inspirationImages', maxCount: 10 }]),
  createBooking
);

// Browse bookings - artist only
router.get('/', protect, authorizeRoles(['artist']), getBookings);

module.exports = router;



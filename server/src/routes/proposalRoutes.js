const express = require('express');
const { createProposal, acceptProposal } = require('../controllers/proposalController');
const { protect } = require('../middleware/auth');
const { authorizeRoles } = require('../middleware/roles');

const router = express.Router();

// Artist applies to a booking
router.post('/', protect, authorizeRoles(['artist']), createProposal);

// Client accepts a proposal
router.post('/:id/accept', protect, authorizeRoles(['client']), acceptProposal);

module.exports = router;



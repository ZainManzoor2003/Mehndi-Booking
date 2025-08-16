const express = require('express');
const { listPosts } = require('../controllers/blogController');

const router = express.Router();

router.get('/', listPosts);

module.exports = router;



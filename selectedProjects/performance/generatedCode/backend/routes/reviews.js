const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const { createReview, getReviews } = require('../controllers/reviewController');
router.post('/', auth, createReview);
router.get('/', auth, getReviews);
module.exports = router;
const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const { create, getAll, getFriendRecommendations } = require('../controllers/recommendationController');
router.post('/', auth, create);
router.get('/', auth, getAll);
router.get('/user/:userId', auth, getFriendRecommendations);
module.exports = router;
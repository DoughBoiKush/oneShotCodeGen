const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const { sendRequest, acceptRequest, getFriends } = require('../controllers/friendshipController');
router.post('/request/:friendId', auth, sendRequest);
router.put('/accept/:userId', auth, acceptRequest);
router.get('/friends', auth, getFriends);
module.exports = router;
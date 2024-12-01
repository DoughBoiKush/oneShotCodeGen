const express = require('express');
const router = express.Router();
const { auth, adminOnly } = require('../middleware/auth');
const { createCycle, getCycles } = require('../controllers/reviewCycleController');
router.post('/', auth, adminOnly, createCycle);
router.get('/', auth, getCycles);
module.exports = router;
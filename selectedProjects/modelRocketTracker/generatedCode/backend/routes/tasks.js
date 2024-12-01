const router = require('express').Router();
const { authenticate } = require('../middleware/auth');
const { create, update } = require('../controllers/taskController');
router.use(authenticate);
router.post('/', create);
router.put('/:id', update);
module.exports = router;
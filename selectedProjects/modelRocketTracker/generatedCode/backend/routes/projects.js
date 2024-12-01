const router = require('express').Router();
const { authenticate } = require('../middleware/auth');
const { create, getAll, getById } = require('../controllers/projectController');
router.use(authenticate);
router.post('/', create);
router.get('/', getAll);
router.get('/:id', getById);
module.exports = router;
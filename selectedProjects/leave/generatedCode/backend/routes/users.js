const router = require('express').Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');
router.use(auth);
router.post('/', userController.createUser);
router.get('/', userController.getUsers);
module.exports = router;
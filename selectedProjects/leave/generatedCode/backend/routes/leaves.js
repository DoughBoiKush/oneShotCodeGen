const router = require('express').Router();
const leaveController = require('../controllers/leaveController');
const auth = require('../middleware/auth');
router.use(auth);
router.post('/', leaveController.createLeaveRequest);
router.get('/', leaveController.getLeaveRequests);
router.put('/:id/status', leaveController.updateLeaveStatus);
module.exports = router;
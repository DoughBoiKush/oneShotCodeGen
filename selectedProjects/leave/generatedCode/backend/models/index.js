const sequelize = require('../config/database');
const User = require('./User');
const LeaveRequest = require('./LeaveRequest');
const LeaveBalance = require('./LeaveBalance');
User.hasMany(LeaveRequest);
LeaveRequest.belongsTo(User);
User.hasOne(LeaveBalance);
LeaveBalance.belongsTo(User);
module.exports = {sequelize,User,LeaveRequest,LeaveBalance};
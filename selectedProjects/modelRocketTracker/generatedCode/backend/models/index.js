const sequelize = require('../config/database');
const User = require('./User');
const Project = require('./Project');
const Task = require('./Task');
User.hasMany(Project);
Project.belongsTo(User);
Project.hasMany(Task);
Task.belongsTo(Project);
module.exports = {sequelize,User,Project,Task};
const sequelize = require('../config/database');
const User = require('./User');
const Application = require('./Application');
Application.belongsTo(User, { as: 'createdBy' });
User.hasMany(Application, { foreignKey: 'createdById' });
module.exports = { sequelize, User, Application };
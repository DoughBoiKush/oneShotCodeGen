const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = sequelize.define('User', {
id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
email: { type: DataTypes.STRING, unique: true, allowNull: false },
password: { type: DataTypes.STRING, allowNull: false },
role: { type: DataTypes.ENUM('admin', 'user'), defaultValue: 'user' },
name: DataTypes.STRING
});
module.exports = User;
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Application = sequelize.define('Application', {
id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
candidateName: { type: DataTypes.STRING, allowNull: false },
position: { type: DataTypes.STRING, allowNull: false },
status: { type: DataTypes.ENUM('new', 'review', 'interview', 'offer', 'rejected'), defaultValue: 'new' },
email: DataTypes.STRING,
phone: DataTypes.STRING,
notes: DataTypes.TEXT
});
module.exports = Application;
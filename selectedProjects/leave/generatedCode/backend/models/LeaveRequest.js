const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const LeaveRequest = sequelize.define('LeaveRequest', {id: {type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},startDate: {type: DataTypes.DATE,allowNull: false},endDate: {type: DataTypes.DATE,allowNull: false},type: {type: DataTypes.ENUM('annual', 'sick', 'personal'),allowNull: false},status: {type: DataTypes.ENUM('pending', 'approved', 'rejected'),defaultValue: 'pending'},reason: DataTypes.TEXT});
module.exports = LeaveRequest;
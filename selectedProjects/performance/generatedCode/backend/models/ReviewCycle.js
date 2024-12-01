const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const ReviewCycle = sequelize.define('ReviewCycle', {id: {type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},name: {type: DataTypes.STRING,allowNull: false},startDate: {type: DataTypes.DATE,allowNull: false},endDate: {type: DataTypes.DATE,allowNull: false},status: {type: DataTypes.ENUM('active', 'completed', 'pending'),defaultValue: 'pending'}});
module.exports = ReviewCycle;
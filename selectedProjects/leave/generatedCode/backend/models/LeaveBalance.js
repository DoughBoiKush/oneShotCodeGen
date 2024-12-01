const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const LeaveBalance = sequelize.define('LeaveBalance', {id: {type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},annual: {type: DataTypes.INTEGER,defaultValue: 20},sick: {type: DataTypes.INTEGER,defaultValue: 10},personal: {type: DataTypes.INTEGER,defaultValue: 5}});
module.exports = LeaveBalance;
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Task = sequelize.define('Task', {
id: {type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},
title: {type: DataTypes.STRING,allowNull: false},
description: DataTypes.TEXT,
status: {type: DataTypes.ENUM('pending', 'in_progress', 'completed'),defaultValue: 'pending'}
});
module.exports = Task;
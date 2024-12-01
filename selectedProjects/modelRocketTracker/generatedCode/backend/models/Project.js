const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Project = sequelize.define('Project', {
id: {type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},
title: {type: DataTypes.STRING,allowNull: false},
description: DataTypes.TEXT,
status: {type: DataTypes.ENUM('in_progress', 'completed'),defaultValue: 'in_progress'}
});
module.exports = Project;
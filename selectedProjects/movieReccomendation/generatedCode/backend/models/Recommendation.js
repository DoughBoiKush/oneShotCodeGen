const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Recommendation = sequelize.define('Recommendation', {
id: {type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},
title: {type: DataTypes.STRING,allowNull: false},
type: {type: DataTypes.ENUM('movie', 'show'),allowNull: false},
description: DataTypes.TEXT
});
module.exports = Recommendation;
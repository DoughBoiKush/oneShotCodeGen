const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Rating = sequelize.define('Rating', {id: {type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},score: {type: DataTypes.INTEGER,allowNull: false},parameter: {type: DataTypes.STRING,allowNull: false}});
module.exports = Rating;
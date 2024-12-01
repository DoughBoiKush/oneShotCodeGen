const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Prompt = sequelize.define('Prompt', {id: {type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},content: {type: DataTypes.TEXT,allowNull: false},title: {type: DataTypes.STRING,allowNull: false},averageRating: {type: DataTypes.FLOAT,defaultValue: 0}});
module.exports = Prompt;
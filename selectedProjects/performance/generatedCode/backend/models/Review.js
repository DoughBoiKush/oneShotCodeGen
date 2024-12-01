const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Review = sequelize.define('Review', {id: {type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},type: {type: DataTypes.ENUM('self', 'peer', 'manager'),allowNull: false},status: {type: DataTypes.ENUM('pending', 'completed'),defaultValue: 'pending'},feedback: {type: DataTypes.TEXT},rating: {type: DataTypes.INTEGER,validate: {min: 1,max: 5}}});
module.exports = Review;
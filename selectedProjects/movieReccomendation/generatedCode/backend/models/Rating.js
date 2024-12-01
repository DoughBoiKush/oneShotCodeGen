const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Rating = sequelize.define('Rating', {
id: {type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},
rating: {type: DataTypes.INTEGER,allowNull: false},
review: DataTypes.TEXT
});
module.exports = Rating;
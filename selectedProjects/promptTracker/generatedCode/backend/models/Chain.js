const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Chain = sequelize.define('Chain', {id: {type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},name: {type: DataTypes.STRING,allowNull: false},description: {type: DataTypes.TEXT}});
module.exports = Chain;
const { DataTypes } = require('sequelize');const sequelize = require('../config/database');const Sale = sequelize.define('Sale',{id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},total:{type:DataTypes.DECIMAL(10,2),allowNull:false},paymentMethod:{type:DataTypes.STRING,allowNull:false}});module.exports = Sale;
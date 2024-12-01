const { DataTypes } = require('sequelize');const sequelize = require('../config/database');const MenuItem = sequelize.define('MenuItem',{id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},name:{type:DataTypes.STRING,allowNull:false},price:{type:DataTypes.DECIMAL(10,2),allowNull:false},description:{type:DataTypes.STRING},category:{type:DataTypes.STRING,allowNull:false}});module.exports = MenuItem;
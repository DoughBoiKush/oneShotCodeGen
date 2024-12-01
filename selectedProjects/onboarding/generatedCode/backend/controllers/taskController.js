const { Task, Employee } = require('../models');const createTask = async (req, res) => {try{const task = await Task.create(req.body);res.status(201).json(task)}catch(error){res.status(500).json({message:error.message})}};const assignTask = async (req, res) => {try{const {taskId,employeeId} = req.body;const task = await Task.findByPk(taskId);const employee = await Employee.findByPk(employeeId);await task.addEmployee(employee);res.json({message:'Task assigned successfully'})}catch(error){res.status(500).json({message:error.message})}};module.exports = {createTask,assignTask};
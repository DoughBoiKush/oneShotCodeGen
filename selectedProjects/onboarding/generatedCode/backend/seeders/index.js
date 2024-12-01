const bcrypt = require('bcryptjs');const {User,Employee,Task,Document,Training} = require('../models');const seed = async () => {try{const adminUser = await User.create({email:'user@example.com',password:bcrypt.hashSync('test123',10),role:'admin'});const employee = await Employee.create({userId:adminUser.id,firstName:'John',lastName:'Doe',status:'active',startDate:new Date()});const task = await Task.create({title:'Complete Orientation',description:'Complete company orientation program',dueDate:new Date()});await task.addEmployee(employee);await Document.create({employeeId:employee.id,type:'ID Proof',status:'pending'});await Training.create({employeeId:employee.id,title:'Company Policy Training',status:'in_progress'})}catch(error){console.error('Seeding error:',error)}};module.exports = seed;
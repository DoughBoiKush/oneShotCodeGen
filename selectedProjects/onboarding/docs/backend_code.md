# Backend Code

{
"files":{
"backend/.env":"PORT=3000\nDB_PATH=./db.sqlite\nJWT_SECRET=hr0ms_s3cr3t_k3y\nNODE_ENV=development",
"backend/config/database.js":"const { Sequelize } = require('sequelize');const path = require('path');const sequelize = new Sequelize({dialect:'sqlite',storage:process.env.DB_PATH,logging:false});module.exports = sequelize;",
"backend/models/User.js":"const { DataTypes } = require('sequelize');const sequelize = require('../config/database');const User = sequelize.define('User',{id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},email:{type:DataTypes.STRING,unique:true,allowNull:false},password:{type:DataTypes.STRING,allowNull:false},role:{type:DataTypes.ENUM('admin','employee'),defaultValue:'employee'}});module.exports = User;",
"backend/models/Employee.js":"const { DataTypes } = require('sequelize');const sequelize = require('../config/database');const Employee = sequelize.define('Employee',{id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},userId:{type:DataTypes.INTEGER,allowNull:false},firstName:{type:DataTypes.STRING,allowNull:false},lastName:{type:DataTypes.STRING,allowNull:false},status:{type:DataTypes.ENUM('pending','active','completed'),defaultValue:'pending'},startDate:{type:DataTypes.DATE}});module.exports = Employee;",
"backend/models/Task.js":"const { DataTypes } = require('sequelize');const sequelize = require('../config/database');const Task = sequelize.define('Task',{id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},title:{type:DataTypes.STRING,allowNull:false},description:{type:DataTypes.TEXT},dueDate:{type:DataTypes.DATE},status:{type:DataTypes.ENUM('pending','in_progress','completed'),defaultValue:'pending'}});module.exports = Task;",
"backend/models/Document.js":"const { DataTypes } = require('sequelize');const sequelize = require('../config/database');const Document = sequelize.define('Document',{id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},employeeId:{type:DataTypes.INTEGER,allowNull:false},type:{type:DataTypes.STRING,allowNull:false},status:{type:DataTypes.ENUM('pending','submitted','approved'),defaultValue:'pending'},fileUrl:{type:DataTypes.STRING}});module.exports = Document;",
"backend/models/Training.js":"const { DataTypes } = require('sequelize');const sequelize = require('../config/database');const Training = sequelize.define('Training',{id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},employeeId:{type:DataTypes.INTEGER,allowNull:false},title:{type:DataTypes.STRING,allowNull:false},status:{type:DataTypes.ENUM('not_started','in_progress','completed'),defaultValue:'not_started'},completionDate:{type:DataTypes.DATE}});module.exports = Training;",
"backend/models/index.js":"const sequelize = require('../config/database');const User = require('./User');const Employee = require('./Employee');const Task = require('./Task');const Document = require('./Document');const Training = require('./Training');Employee.belongsTo(User);Document.belongsTo(Employee);Training.belongsTo(Employee);Task.belongsToMany(Employee,{through:'EmployeeTasks'});Employee.belongsToMany(Task,{through:'EmployeeTasks'});module.exports = {sequelize,User,Employee,Task,Document,Training};",
"backend/controllers/authController.js":"const jwt = require('jsonwebtoken');const bcrypt = require('bcryptjs');const { User } = require('../models');const login = async (req, res) => {try{const {email,password} = req.body;const user = await User.findOne({where:{email}});if(!user||!bcrypt.compareSync(password,user.password))return res.status(401).json({message:'Invalid credentials'});const token = jwt.sign({id:user.id,role:user.role},process.env.JWT_SECRET,{expiresIn:'24h'});res.json({token})}catch(error){res.status(500).json({message:error.message})}};module.exports = {login};",
"backend/controllers/employeeController.js":"const { Employee, User, Task, Document, Training } = require('../models');const bcrypt = require('bcryptjs');const createEmployee = async (req, res) => {try{const {email,password,firstName,lastName,startDate} = req.body;const hashedPassword = bcrypt.hashSync(password,10);const user = await User.create({email,password:hashedPassword,role:'employee'});const employee = await Employee.create({userId:user.id,firstName,lastName,startDate});res.status(201).json(employee)}catch(error){res.status(500).json({message:error.message})}};const getEmployees = async (req, res) => {try{const employees = await Employee.findAll({include:[User,Task,Document,Training]});res.json(employees)}catch(error){res.status(500).json({message:error.message})}};module.exports = {createEmployee,getEmployees};",
"backend/controllers/taskController.js":"const { Task, Employee } = require('../models');const createTask = async (req, res) => {try{const task = await Task.create(req.body);res.status(201).json(task)}catch(error){res.status(500).json({message:error.message})}};const assignTask = async (req, res) => {try{const {taskId,employeeId} = req.body;const task = await Task.findByPk(taskId);const employee = await Employee.findByPk(employeeId);await task.addEmployee(employee);res.json({message:'Task assigned successfully'})}catch(error){res.status(500).json({message:error.message})}};module.exports = {createTask,assignTask};",
"backend/controllers/documentController.js":"const { Document } = require('../models');const uploadDocument = async (req, res) => {try{const document = await Document.create(req.body);res.status(201).json(document)}catch(error){res.status(500).json({message:error.message})}};const getDocuments = async (req, res) => {try{const documents = await Document.findAll();res.json(documents)}catch(error){res.status(500).json({message:error.message})}};module.exports = {uploadDocument,getDocuments};",
"backend/middleware/auth.js":"const jwt = require('jsonwebtoken');const authMiddleware = (req, res, next) => {try{const token = req.headers.authorization?.split(' ')[1];if(!token)return res.status(401).json({message:'No token provided'});const decoded = jwt.verify(token,process.env.JWT_SECRET);req.user = decoded;next()}catch(error){res.status(401).json({message:'Invalid token'})}};const adminOnly = (req, res, next) => {if(req.user.role!=='admin')return res.status(403).json({message:'Admin access required'});next()};module.exports = {authMiddleware,adminOnly};",
"backend/routes/auth.js":"const express = require('express');const router = express.Router();const {login} = require('../controllers/authController');router.post('/login',login);module.exports = router;",
"backend/routes/employees.js":"const express = require('express');const router = express.Router();const {createEmployee,getEmployees} = require('../controllers/employeeController');const {authMiddleware,adminOnly} = require('../middleware/auth');router.post('/',authMiddleware,adminOnly,createEmployee);router.get('/',authMiddleware,adminOnly,getEmployees);module.exports = router;",
"backend/routes/tasks.js":"const express = require('express');const router = express.Router();const {createTask,assignTask} = require('../controllers/taskController');const {authMiddleware,adminOnly} = require('../middleware/auth');router.post('/',authMiddleware,adminOnly,createTask);router.post('/assign',authMiddleware,adminOnly,assignTask);module.exports = router;",
"backend/routes/documents.js":"const express = require('express');const router = express.Router();const {uploadDocument,getDocuments} = require('../controllers/documentController');const {authMiddleware,adminOnly} = require('../middleware/auth');router.post('/',authMiddleware,uploadDocument);router.get('/',authMiddleware,getDocuments);module.exports = router;",
"backend/seeders/index.js":"const bcrypt = require('bcryptjs');const {User,Employee,Task,Document,Training} = require('../models');const seed = async () => {try{const adminUser = await User.create({email:'user@example.com',password:bcrypt.hashSync('test123',10),role:'admin'});const employee = await Employee.create({userId:adminUser.id,firstName:'John',lastName:'Doe',status:'active',startDate:new Date()});const task = await Task.create({title:'Complete Orientation',description:'Complete company orientation program',dueDate:new Date()});await task.addEmployee(employee);await Document.create({employeeId:employee.id,type:'ID Proof',status:'pending'});await Training.create({employeeId:employee.id,title:'Company Policy Training',status:'in_progress'})}catch(error){console.error('Seeding error:',error)}};module.exports = seed;",
"backend/server.js":"require('dotenv').config();const express = require('express');const cors = require('cors');const {sequelize} = require('./models');const seed = require('./seeders');const app = express();app.use(cors());app.use(express.json());app.use('/api/auth',require('./routes/auth'));app.use('/api/employees',require('./routes/employees'));app.use('/api/tasks',require('./routes/tasks'));app.use('/api/documents',require('./routes/documents'));const initializeDatabase = async () => {try{await sequelize.sync({force:true});await seed();console.log('Database initialized')}catch(error){console.error('Database initialization error:',error)}};initializeDatabase();app.listen(process.env.PORT,()=>console.log(`Server running on port ${process.env.PORT}`));"
},
"commands":["mkdir backend","cd backend && npm init -y","cd backend && npm install express sequelize sqlite3 bcryptjs jsonwebtoken cors dotenv"]
}
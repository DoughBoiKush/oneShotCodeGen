# Backend Code

```json
{
    "files": {
        "backend/models/index.js": "const { Sequelize, DataTypes } = require('sequelize');const sequelize = new Sequelize({dialect: 'sqlite',storage: './database.sqlite'});const User = require('./user')(sequelize, DataTypes);const Expense = require('./expense')(sequelize, DataTypes);User.hasMany(Expense, { foreignKey: 'userId' });Expense.belongsTo(User, { foreignKey: 'userId' });module.exports = { sequelize, User, Expense };",
        "backend/models/user.js": "module.exports = (sequelize, DataTypes) => {return sequelize.define('User', {id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},name: {type: DataTypes.STRING, allowNull: false},email: {type: DataTypes.STRING, allowNull: false, unique: true},password: {type: DataTypes.STRING, allowNull: false},role: {type: DataTypes.STRING, defaultValue: 'user'},status: {type: DataTypes.BOOLEAN, defaultValue: true}});};",
        "backend/models/expense.js": "module.exports = (sequelize, DataTypes) => {return sequelize.define('Expense', {id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},title: {type: DataTypes.STRING, allowNull: false},amount: {type: DataTypes.FLOAT, allowNull: false},category: {type: DataTypes.STRING, allowNull: false},date: {type: DataTypes.DATEONLY, allowNull: false},receipt: {type: DataTypes.STRING, allowNull: true},status: {type: DataTypes.STRING, defaultValue: 'Pending'},userId: {type: DataTypes.INTEGER, allowNull: false}});};",
        "backend/routes/userRoutes.js": "const express = require('express');const { signup, login, getAllUsers, updateUser } = require('../controllers/userController');const router = express.Router();router.post('/signup', signup);router.post('/login', login);router.get('/users', getAllUsers);router.put('/users/:id', updateUser);module.exports = router;",
        "backend/routes/expenseRoutes.js": "const express = require('express');const { submitExpense, getExpenses, updateExpense } = require('../controllers/expenseController');const router = express.Router();router.post('/expenses', submitExpense);router.get('/expenses', getExpenses);router.put('/expenses/:id', updateExpense);module.exports = router;",
        "backend/controllers/userController.js": "const bcrypt = require('bcrypt');const jwt = require('jsonwebtoken');const { User } = require('../models');const signup = async (req, res) => {try {const { name, email, password } = req.body;const hashedPassword = await bcrypt.hash(password, 10);const user = await User.create({ name, email, password: hashedPassword });res.status(201).json(user);} catch (error) {res.status(400).json({ error: 'Signup failed' });}};const login = async (req, res) => {try {const { email, password } = req.body;const user = await User.findOne({ where: { email } });if (!user || !(await bcrypt.compare(password, user.password))) {return res.status(401).json({ error: 'Invalid credentials' });}const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);res.json({ token });} catch (error) {res.status(400).json({ error: 'Login failed' });}};const getAllUsers = async (req, res) => {try {const users = await User.findAll();res.json(users);} catch (error) {res.status(400).json({ error: 'Failed to fetch users' });}};const updateUser = async (req, res) => {try {const { id } = req.params;const { name, role, status } = req.body;await User.update({ name, role, status }, { where: { id } });res.json({ message: 'User updated successfully' });} catch (error) {res.status(400).json({ error: 'Failed to update user' });}};module.exports = { signup, login, getAllUsers, updateUser };",
        "backend/controllers/expenseController.js": "const { Expense, User } = require('../models');const submitExpense = async (req, res) => {try {const { title, amount, category, date, receipt, userId } = req.body;const expense = await Expense.create({ title, amount, category, date, receipt, userId });res.status(201).json(expense);} catch (error) {res.status(400).json({ error: 'Failed to submit expense' });}};const getExpenses = async (req, res) => {try {const expenses = await Expense.findAll({ include: User });res.json(expenses);} catch (error) {res.status(400).json({ error: 'Failed to fetch expenses' });}};const updateExpense = async (req, res) => {try {const { id } = req.params;const { status } = req.body;await Expense.update({ status }, { where: { id } });res.json({ message: 'Expense updated successfully' });} catch (error) {res.status(400).json({ error: 'Failed to update expense' });}};module.exports = { submitExpense, getExpenses, updateExpense };",
        "backend/config/db.js": "const { sequelize } = require('../models');const setupDatabase = async () => {try {await sequelize.authenticate();await sequelize.sync({ force: true });console.log('Database connected and synced successfully');} catch (error) {console.error('Database connection failed:', error);}};module.exports = setupDatabase;",
        "backend/config/seeder.js": "const bcrypt = require('bcrypt');const { User, Expense } = require('../models');const seedDatabase = async () => {const hashedPassword = await bcrypt.hash('test123', 10);await User.bulkCreate([{ name: 'Admin User', email: 'user@example.com', password: hashedPassword, role: 'admin', status: true },{ name: 'John Doe', email: 'john@example.com', password: hashedPassword, role: 'user', status: true }]);await Expense.bulkCreate([{ title: 'Team Lunch', amount: 50, category: 'Food', date: '2023-10-01', userId: 1 },{ title: 'Travel Expenses', amount: 100, category: 'Travel', date: '2023-10-02', userId: 2 }]);};module.exports = seedDatabase;",
        "backend/server.js": "require('dotenv').config();const express = require('express');const cors = require('cors');const setupDatabase = require('./config/db');const seedDatabase = require('./config/seeder');const userRoutes = require('./routes/userRoutes');const expenseRoutes = require('./routes/expenseRoutes');const app = express();app.use(cors());app.use(express.json());app.use('/api', userRoutes);app.use('/api', expenseRoutes);const PORT = 3000;setupDatabase().then(seedDatabase).then(() => {app.listen(PORT, () => console.log(`Server running on port ${PORT}`));});",
        "backend/.env": "JWT_SECRET=supersecretkey"
    },
    "commands": ["mkdir backend","cd backend && npm init -y","cd backend && npm install express sequelize sqlite3 cors dotenv bcrypt jsonwebtoken"]
}
```
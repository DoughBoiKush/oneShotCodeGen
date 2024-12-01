const express = require('express');const { submitExpense, getExpenses, updateExpense } = require('../controllers/expenseController');const router = express.Router();router.post('/expenses', submitExpense);router.get('/expenses', getExpenses);router.put('/expenses/:id', updateExpense);module.exports = router;
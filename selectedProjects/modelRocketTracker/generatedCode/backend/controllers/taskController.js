const { Task } = require('../models');
const create = async (req, res) => {
try {
const task = await Task.create(req.body);
res.status(201).json(task);
} catch (error) {res.status(500).json({ message: error.message });}
};
const update = async (req, res) => {
try {
const [updated] = await Task.update(req.body, { where: { id: req.params.id } });
if (!updated) return res.status(404).json({ message: 'Task not found' });
const task = await Task.findByPk(req.params.id);
res.json(task);
} catch (error) {res.status(500).json({ message: error.message });}
};
module.exports = { create, update };
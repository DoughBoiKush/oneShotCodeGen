const { Project, Task } = require('../models');
const create = async (req, res) => {
try {
const project = await Project.create({ ...req.body, UserId: req.user.id });
res.status(201).json(project);
} catch (error) {res.status(500).json({ message: error.message });}
};
const getAll = async (req, res) => {
try {
const projects = await Project.findAll({ where: { UserId: req.user.id }, include: [{ model: Task }] });
res.json(projects);
} catch (error) {res.status(500).json({ message: error.message });}
};
const getById = async (req, res) => {
try {
const project = await Project.findOne({ where: { id: req.params.id, UserId: req.user.id }, include: [{ model: Task }] });
if (!project) return res.status(404).json({ message: 'Project not found' });
res.json(project);
} catch (error) {res.status(500).json({ message: error.message });}
};
module.exports = { create, getAll, getById };
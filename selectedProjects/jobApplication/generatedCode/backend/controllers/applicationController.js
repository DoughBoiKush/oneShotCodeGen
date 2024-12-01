const { Application, User } = require('../models');
exports.create = async (req, res) => {
try {
const application = await Application.create({ ...req.body, createdById: req.user.id });
res.status(201).json(application);
} catch (error) {
res.status(400).json({ message: error.message });
}
};
exports.getAll = async (req, res) => {
try {
const applications = await Application.findAll({ include: [{ model: User, as: 'createdBy' }] });
res.json(applications);
} catch (error) {
res.status(500).json({ message: error.message });
}
};
exports.update = async (req, res) => {
try {
const application = await Application.findByPk(req.params.id);
if (!application) return res.status(404).json({ message: 'Application not found' });
await application.update(req.body);
res.json(application);
} catch (error) {
res.status(400).json({ message: error.message });
}
};
exports.delete = async (req, res) => {
try {
const application = await Application.findByPk(req.params.id);
if (!application) return res.status(404).json({ message: 'Application not found' });
await application.destroy();
res.status(204).send();
} catch (error) {
res.status(500).json({ message: error.message });
}
};
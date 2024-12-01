const { Recommendation, User, Rating } = require('../models');
const create = async (req, res) => {
try {
const recommendation = await Recommendation.create({ ...req.body, UserId: req.user.id });
res.status(201).json(recommendation);
} catch (error) {
res.status(400).json({ error: error.message });
}
};
const getAll = async (req, res) => {
try {
const recommendations = await Recommendation.findAll({include: [{model: User, attributes: ['name']},{model: Rating}]});
res.json(recommendations);
} catch (error) {
res.status(500).json({ error: error.message });
}
};
const getFriendRecommendations = async (req, res) => {
try {
const recommendations = await Recommendation.findAll({where: { UserId: req.params.userId },include: [{model: User, attributes: ['name']},{model: Rating}]});
res.json(recommendations);
} catch (error) {
res.status(500).json({ error: error.message });
}
};
module.exports = { create, getAll, getFriendRecommendations };
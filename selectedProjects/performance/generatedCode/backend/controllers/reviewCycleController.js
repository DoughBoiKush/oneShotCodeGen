const { ReviewCycle } = require('../models');
const createCycle = async (req, res) => {try {const cycle = await ReviewCycle.create(req.body);
res.status(201).json(cycle);} catch (error) {res.status(500).json({ message: 'Server error' })}};
const getCycles = async (req, res) => {try {const cycles = await ReviewCycle.findAll();
res.json(cycles);} catch (error) {res.status(500).json({ message: 'Server error' })}};
module.exports = { createCycle, getCycles };
const jwt = require('jsonwebtoken');const auth = (req, res, next) => {try {const token = req.headers.authorization?.split(' ')[1];if (!token) return res.status(401).json({ message: 'No token provided' });const decoded = jwt.verify(token, process.env.JWT_SECRET);req.userId = decoded.id;next();} catch (error) {return res.status(401).json({ message: 'Invalid token' });}};const isAdmin = async (req, res, next) => {try {const user = await require('../models').User.findByPk(req.userId);if (!user.isAdmin) return res.status(403).json({ message: 'Requires admin access' });next();} catch (error) {return res.status(500).json({ message: 'Server error' });}};module.exports = { auth, isAdmin };
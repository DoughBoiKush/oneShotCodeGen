const { Review, User, ReviewCycle } = require('../models');
const createReview = async (req, res) => {try {const review = await Review.create({...req.body,reviewerId: req.user.id});
res.status(201).json(review);} catch (error) {res.status(500).json({ message: 'Server error' })}};
const getReviews = async (req, res) => {try {const reviews = await Review.findAll({include: [{model: User,as: 'reviewer'},{model: User,as: 'employee'},{model: ReviewCycle}]});
res.json(reviews);} catch (error) {res.status(500).json({ message: 'Server error' })}};
module.exports = { createReview, getReviews };
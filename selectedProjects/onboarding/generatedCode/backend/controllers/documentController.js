const { Document } = require('../models');const uploadDocument = async (req, res) => {try{const document = await Document.create(req.body);res.status(201).json(document)}catch(error){res.status(500).json({message:error.message})}};const getDocuments = async (req, res) => {try{const documents = await Document.findAll();res.json(documents)}catch(error){res.status(500).json({message:error.message})}};module.exports = {uploadDocument,getDocuments};
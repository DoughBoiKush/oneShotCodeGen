const jwt = require('jsonwebtoken');const bcrypt = require('bcryptjs');const { User } = require('../models');const login = async (req,res) => {try{const {email,password} = req.body;const user = await User.findOne({where:{email}});if(!user||!bcrypt.compareSync(password,user.password))return res.status(401).json({message:'Invalid credentials'});const token = jwt.sign({id:user.id,role:user.role},process.env.JWT_SECRET,{expiresIn:'24h'});res.json({token,user:{id:user.id,name:user.name,email:user.email,role:user.role}})}catch(error){res.status(500).json({message:'Server error'})}};module.exports = {login};
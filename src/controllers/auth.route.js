const express = require('express');
const router = express.Router();
const { User } = require('../models/user.model.js');
const userRepository = require('../models/user-repository');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
require('dotenv').config();

router.post('/login',
  body('email').isEmail(),
  body('password').isLength({ min: 5 }),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
    }
  const foundUser = await userRepository.getUserByEmail(req.body.email);
      console.log(foundUser)
  const login = bcrypt.compareSync(req.body.password, foundUser.password);

  if(login === true){
    const token = jwt.sign({
            user_id: foundUser.user_id,
            firstName: foundUser.firstName,
            lastName: foundUser.lastName,
            nickname: foundUser.nickname,
            age: foundUser.age,
            email: foundUser.email,
      //  password
     // permissions : [foundUser.isAdmin ? 'admin' : '']
    },
     process.env.SECRET_KEY,  { expiresIn: process.env.JWT_EXPIRES_IN });
    res.status(200).send({token});
  } else{
    res.sendStatus(401);
  }
  
  });


exports.initializeRoutes = () => router;
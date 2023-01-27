const express = require('express');
const router = express.Router();
const userRepository = require('../models/user-repository');
const { Sequelize, Model, DataTypes } = require('sequelize');
const { User } = require('../models/user.model.js');
const { body, validationResult } = require('express-validator');
const {levelUserRepository} = require("../models/user-level-repository");
const guard = require('express-jwt-permissions')({
  requestProperty: 'auth',
});

router.get('/connection', async (req, res) => {
  try {
      const eliza = await userRepository.createUser({
          firstName: 'Yelyzaveta',
          lastName: 'Piunova',
          //isAdmin: false,
          age: 20,
          nickname: 'lizbet',
          email: 'elizavetaice123@gmail.com',
          password: 'qwerty'
      });
      const ksu = await userRepository.createUser({
          firstName: 'Ksu',
          lastName: 'Ksu',
          //isAdmin: false,
          age: 10,
          nickname: 'ksuksu',
          email: 'ksuksuksu@gmail.com',
          password: 'ksuksu'
      });
      const users = await User.findAll();
      res.status(200).send(users)
  } catch (e) {
      res.status(500).send('This name already in use')
  }
});

router.get('/info/:id_user', async (req, res) => {
    const findUserId = await userRepository.getUserById(req.params.id_user);
    console.log(req.params.id_user)
    if(!findUserId) {
        res.status(500).send('Id not found')
        return
    }
    console.log(findUserId)
    res.status(200).send(findUserId)
});


router.get('/', async (req, res) => {
  res.send( await userRepository.getUsers());
});

router.get('/:firstName',guard.check(['admin']), async (req, res) => {
  const foundUser = await userRepository.getUserByFirstName(req.params.firstName);

  if (!foundUser) {
    res.status(500).send('User not found');
    return;
  }
  
  res.send(foundUser);
});

router.post('/create',
    body('firstName').isAlphanumeric().isLength({ min: 2 }),
    body('lastName').isAlphanumeric().isLength({ min: 2 }),
    body('nickname').isAlphanumeric().isLength({ min: 3 }),
    body('age').isNumeric().isLength({ min: 1 }),
    body('email').isEmail().isLength({ min: 5 }),
    body('password').isLength({ min: 5 }),
  // body('isAdmin').isAlphanumeric(),


      async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        const existingUser = await userRepository.getUserByEmail(req.body.email)
        console.log(existingUser)
        if(existingUser){
         return   res.status(401).json({ error: "Unable to create the user" });

        } else {
            await userRepository.createUser(req.body);
         return   res.status(201).end();
        }
    } catch (e) {
        res.status(500).send(e)
    }
});

router.put('/update-user/:id_user',
    async (req, res) => {
    try {
        let userUpdate = await userRepository.updateUser(req.params.id_user, req.body);
        res.status(200).send(userUpdate);
    } catch (e) {
        console.log(e)
        res.send(e).end();
    }
    });


router.get('/update/:id_user', async (req, res) => {
    const findUserId = await userRepository.getUserById(req.params.id_user);
    if(!findUserId) {
        res.status(500).send('Id not found')
        return
    }
    console.log(findUserId)
    res.status(200).send(findUserId)
});

router.delete('/:id', guard.check(['asmin']), async (req, res) => {
  await userRepository.deleteUser(req.params.id);
  res.status(204).end();
});

exports.initializeRoutes = () => router;

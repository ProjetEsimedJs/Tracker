const express = require('express');
const router = express.Router();
const userRepository = require('../models/user-repository');
const { Sequelize, Model, DataTypes } = require('sequelize');
const { User } = require('../models/user.model.js');
const { body, validationResult } = require('express-validator');
const guard = require('express-jwt-permissions')({
  requestProperty: 'auth',
});

router.get('/connection', async (req, res) => {
  try {
      const eliza = await userRepository.createUser({
          firstName: 'Yelyzaveta',
          lastName: 'Piunova',
          isAdmin: false,
          age: 20,
          nickname: 'lizbet',
          email: 'elizavetaice123@gmail.com',
          password: 'qwerty'
      });
      const ksu = await userRepository.createUser({
          firstName: 'Ksu',
          lastName: 'Ksu',
          isAdmin: false,
          age: 10,
          nickname: 'ksuksu',
          email: 'ksuksuksu@gmail.com',
          password: 'ksuksu'
      });
      const users = await User.findAll();
      res.status(200).send(users)
  } catch (E) {
      res.status(500).send('This name already in use')
  }
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

router.post('/',
    body('firstName').isAlphanumeric().isLength({ min: 2 }),
    body('lastName').isAlphanumeric().isLength({ min: 2 }),
    body('nickname').isAlphanumeric().isLength({ min: 3 }),
    body('age').isNumeric().isLength({ min: 1 }),
    body('email').isEmail().isLength({ min: 5 }),
    body('password').isLength({ min: 5 }),
   body('isAdmin').isAlphanumeric(),

      async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        await userRepository.createUser(req.body);
        res.status(201).end();
    } catch (e) {
        res.status(500).send(e)
    }
});

router.put('/:id',guard.check(['admin']), async (req, res) => {
  await userRepository.updateUser(req.params.id, req.body).catch((err) => res.status(500).send(err.message));
  res.status(204).end();
});

router.delete('/:id', guard.check(['asmin']), async (req, res) => {
  await userRepository.deleteUser(req.params.id);
  res.status(204).end();
});

exports.initializeRoutes = () => router;

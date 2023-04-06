const express = require('express');
const router = express.Router();
const { User } = require('../models/user.model.js');
const userRepository = require('../repositories/user-repository');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
require('dotenv').config();

router.post('/login',
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),

    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const foundUser = await userRepository.getUserByEmail(req.body.email);
            const login = bcrypt.compareSync(req.body.password, foundUser.password);

            if(login === true){
                const token = jwt.sign({
                        id_user: foundUser.id_user,
                    },
                    process.env.SECRET_KEY,  { expiresIn: process.env.JWT_EXPIRES_IN });
                res.status(200).send({token});
            }
            else{
                res.sendStatus(401);
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal server error');
        }
    });

router.get('/refresh/:id_user', async (req, res) => {
    try{
        const id_user = req.params.id_user

        const token = jwt.sign({id_user: id_user},
            process.env.SECRET_KEY ,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        res.status(200).send({token})
    } catch (e) {
        return res.sendStatus(500)
    }
});



exports.initializeRoutes = () => router;
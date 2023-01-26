const express = require('express');
const router = express.Router();
const levelUserRepository = require('../models/user-level-repository');
const levelRepository = require('../models/level-repository');
require('dotenv').config()

    router.post('/post', async (req, res) => {
       try {
            const start = Date.now();
            const klm = await levelUserRepository.createUserlevel({
                id_user_level: 3,
                id_level: 1,
                id_user: 'a4792539-1605-404e-a7ea-4e7355aaa4d1',
                level_date_start: start,
                level_date_end: start

            });
            res.status(200).end()
        } catch (e) {
            res.status(500).send(e)
        }
    });


router.get('/get-level/:id_level', async (req, res) => {
    const foundLevel = await levelRepository.getLevel(req.params.id_level);
    if (!foundLevel) {
        res.status(500).send('Level not found');
        return;
    }
    res.status(200).send(foundLevel);
});

router.get('/getAll', async (req, res) => {
    try{
    res.send( await levelUserRepository.getAllUserLevel());
        res.status(200).end()
    } catch (e) {
        res.status(500).send('Error')
    }
});

router.get('/:id_user', async (req, res) => {
    const foundUserLevel = await levelUserRepository.getLevelUser(req.params.id_user);
    console.log(foundUserLevel)

    if (!foundUserLevel) {
        res.status(500).send('user not found');
        return;
    }
    res.send(foundUserLevel);
});


exports.initializeRoutes = () => router;
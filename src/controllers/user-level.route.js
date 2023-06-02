const express = require('express');
const router = express.Router();
const levelUserRepository = require('../repositories/user-level-repository.js');
const levelRepository = require('../repositories/level-repository.js');

require('dotenv').config()


router.post('/seeder-level-user', async (req, res) => {
    const level_user =
        {
            id_level: 1,
        };

    try {
        await levelUserRepository.createUserlevel(level_user);
        res.status(200).send('Seeded level_user successfully!');
    } catch (err) {
        console.log(err);
        res.status(500).send('Failed to seed level_user.');
    }
});

router.get('/get-level/:id_level', async (req, res) => {
    try {
        const foundLevel = await levelRepository.getLevel(req.params.id_level);
        if (!foundLevel) {
            res.status(500).send('Level not found');
            return;
        }
        res.status(200).send(foundLevel);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});


router.get('/getAll', async (req, res) => {
    try{
    res.send( await levelUserRepository.getAllUserLevel());
        res.status(200).end()
    } catch (e) {
        res.status(500).send('Internal server error')
    }
});

router.get('/:id_user', async (req, res) => {
    try {
        const foundUserLevel = await levelUserRepository.getLevelUser(req.params.id_user);
        if (!foundUserLevel) {
            res.status(500).send('user not found');
            return;
        }
        res.status(200).send(foundUserLevel);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});


router.get('/infoLevel/:id_user', async (req, res) => {
    try {
        const findUserLevelId = await levelUserRepository.getUserLevelById(req.params.id_user);
        if (!findUserLevelId) {
            res.status(500).send('Id not found')
            return
        }
        res.status(200).send(findUserLevelId)
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});



router.put('/nextLevel/:id_user', async (req, res) => {
    try{
       await levelUserRepository.setNextLevel(req.params.id_user);
        res.status(200).send('User level updated successfully');
    } catch (e) {
        console.error(e);
        res.status(500).send('Error updating user level');
    }
})



exports.initializeRoutes = () => router;
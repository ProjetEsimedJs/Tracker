const express = require('express');
const router = express.Router();
const levelUserRepository = require('../repositories/user-level-repository.js');
const levelRepository = require('../repositories/level-repository.js');
const userRepository = require("../repositories/user-repository");

require('dotenv').config()

    router.post('/post', async (req, res) => {
        try {
            const start0 = Date.now();
            const af = await levelUserRepository.createUserlevel({
               id_user_level: 4,
               id_level: 1,
               id_user: '9bf48a5a-dbbf-4d97-ae18-16c2a62f6220',
               level_date_start: start0,
               level_date_end: start0
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

    if (!foundUserLevel) {
        res.status(500).send('user not found');
        return;
    }
    res.send(foundUserLevel);
});


router.put('/updateLevel/:id_user', async (req, res) => {
    try{
        let foundUserLevel = await levelUserRepository.getLevelUser(req.params.id_user);
        foundUserLevel.id_level += 1;
        let updatedLevel =  await foundUserLevel.update({ id_level: foundUserLevel.id_level });
       console.log(updatedLevel);
        res.status(200).send('User level updated successfully');
    } catch (e) {
        console.error(e);
        res.status(500).send('Error updating user level');
    }
})


router.get('/infoLevel/:id_user', async (req, res) => {
    const findUserLevelId = await levelUserRepository.getUserLevelById(req.params.id_user);
    console.log(req.params.id_user)
    if(!findUserLevelId) {
        res.status(500).send('Id not found')
        return
    }
    res.status(200).send(findUserLevelId)
});


router.put('/nextLevel/:id_user', async (req, res) => {
    try{
        let nextLevel = await levelUserRepository.setNextLevel(req.params.id_user);
        console.log(nextLevel);
        res.status(200).send('User level updated successfully');
    } catch (e) {
        console.error(e);
        res.status(500).send('Error updating user level');
    }
})



exports.initializeRoutes = () => router;
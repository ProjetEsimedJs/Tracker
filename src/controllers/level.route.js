const express = require('express');
const router = express.Router();
const levelRepository = require('../repositories/level-repository');
require('dotenv').config()


const {Level} = require("../models/level.model");

router.post('/post', async (req, res) => {
    const levelNames = [
        "Weeks of sport",
        "Weeks of languages",
        "Weeks of food",
        "Weeks of music",
        "Weeks of culture",
        "Weeks of hobbies",
        "Weeks of books",
        "Weeks of history",
        "Bonus"
    ];

    try {
        await Promise.all(levelNames.map(name => levelRepository.createLevel({ name_level: name })));
        const levels = await Level.findAll();
        res.status(200).send(levels);
    } catch (e) {
        res.status(500).send();
    }
});

router.get('/getAll', async (req, res) => {
    try{
    res.send( await levelRepository.getAllLevels());
        res.status(200).end()
    } catch (e) {
        res.status(500).send('Error')
    }
});




exports.initializeRoutes = () => router;
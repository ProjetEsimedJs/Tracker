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
        await Level.findAll();
        res.status(200).send('Post successful');
    } catch (e) {
        res.status(500).send('Internal error');
    }
});

router.get('/:id_level', async (req, res) => {
    try {
        const idLevel = await levelRepository.getNumberLevel(req.params.id_level);
        if (!idLevel) {
            res.status(500).send('level not found');
            return;
        }
        res.send(idLevel);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});




exports.initializeRoutes = () => router;
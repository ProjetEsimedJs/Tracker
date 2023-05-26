const express = require('express');
const router = express.Router();
const levelRepository = require('../repositories/level-repository');
require('dotenv').config()
const {Level} = require("../models/level.model");



router.post('/seeder-level', async (req, res) => {
    const level =
        {
            name_level: 'Beginner level',
        };

    try {
        await levelRepository.createLevel(level);
        res.status(200).send('Seeded level successfully!');
    } catch (err) {
        console.log(err);
        res.status(500).send('Failed to seed level.');
    }
});


router.post('/post', async (req, res) => {
    const levelNames = [
        "Semaine sportive",
        "Semaine culturelle",
        "Semaine d'apprentisage",
        "Semaine d'hobbies",
        "Semaine nutritionnelle",
        "Semaine de soins personelles",
        "Semaine sociable",
        "Semaine menage de printemps"
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
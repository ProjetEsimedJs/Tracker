const express = require('express');
const router = express.Router();
const levelRepository = require('../repositories/level-repository');
require('dotenv').config()


const {Level} = require("../models/level.model");


router.post('/post', async (req, res) => {
    try {
        await levelRepository.createLevel({
            name_level: "Weeks of sport"
        });
        await levelRepository.createLevel({
            name_level: "Weeks of languages"
        });
        await levelRepository.createLevel({
            name_level: "Weeks of food"
        });
        await levelRepository.createLevel({
            name_level: "Weeks of music"
        });
        await levelRepository.createLevel({
            name_level: "Weeks of culture"
        });
        await levelRepository.createLevel({
            name_level: "Weeks of hobbies"
        });
        await levelRepository.createLevel({
            name_level: "Weeks of books"
        });
        await levelRepository.createLevel({
            name_level: "Weeks of history"
        });

        const levels = await Level.findAll();

        res.status(200).send(levels)
    } catch (e) {
        res.status(500);
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
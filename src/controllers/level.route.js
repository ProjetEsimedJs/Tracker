const express = require('express');
const router = express.Router();
const levelRepository = require('../models/level-repository');
require('dotenv').config()


const {Level} = require("../models/level.model");

router.get('/level', async (req, res) => {
    try {
        await levelRepository.createLevel({
            id_level : 1,
            name_level: "Weeks of sport"
        });
        await levelRepository.createLevel({
            id_level : 2,
            name_level: "Weeks of languages"
        });
        await levelRepository.createLevel({
            id_level : 3,
            name_level: "Weeks of food"
        });
        await levelRepository.createLevel({
            id_level : 4,
            name_level: "Weeks of music"
        });
        await levelRepository.createLevel({
            id_level : 5,
            name_level: "Weeks of culture"
        });
        await levelRepository.createLevel({
            id_level : 6,
            name_level: "Weeks of hobbies"
        });
        await levelRepository.createLevel({
            id_level : 7,
            name_level: "Weeks of books"
        });
        await levelRepository.createLevel({
            id_level : 8,
            name_level: "Weeks of history"
        });

        const levels = await Level.findAll();

        res.status(200).send(levels)
    } catch (e) {
        res.status(500);
    }
});

exports.initializeRoutes = () => router;
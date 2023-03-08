const express = require('express');
const router = express.Router();
require('dotenv').config()
const {Task} = require("../models/task.model");
const taskRepository = require("../repositories/task-repository");

router.post('/post', async (req, res) => {
    try {
        const tasks = [
            { id_level: 1, name_task: "yoga" },
            { id_level: 1, name_task: "run" },
            { id_level: 1, name_task: "swim" },
            { id_level: 1, name_task: "read" },
            { id_level: 1, name_task: "listen" },
            { id_level: 1, name_task: "walk" },
            { id_level: 1, name_task: "go" },
            { id_level: 2, name_task: "Weeks of sport" },
            { id_level: 2, name_task: "Weeks of languages" },
            { id_level: 2, name_task: "Weeks of food" },
            { id_level: 2, name_task: "Weeks of music" },
            { id_level: 2, name_task: "Weeks of culture" },
            { id_level: 2, name_task: "Weeks of hobbies" },
            { id_level: 2, name_task: "Weeks of books" },
            { id_level: 3, name_task: "Weeks of sport" },
            { id_level: 3, name_task: "Weeks of languages" },
            { id_level: 3, name_task: "Weeks of food" },
            { id_level: 3, name_task: "Weeks of music" },
            { id_level: 3, name_task: "Weeks of culture" },
            { id_level: 3, name_task: "Weeks of hobbies" },
            { id_level: 3, name_task: "Weeks of books" },
            { id_level: 4, name_task: "Weeks of sport" },
            { id_level: 4, name_task: "Weeks of languages" },
            { id_level: 4, name_task: "Weeks of food" },
            { id_level: 4, name_task: "Weeks of music" },
            { id_level: 4, name_task: "Weeks of culture" },
            { id_level: 4, name_task: "Weeks of hobbies" },
            { id_level: 4, name_task: "Weeks of books" },
            { id_level: 5, name_task: "Weeks of sport" },
            { id_level: 5, name_task: "Weeks of languages" },
            { id_level: 5, name_task: "Weeks of food" },
            { id_level: 5, name_task: "Weeks of music" },
            { id_level: 5, name_task: "Weeks of culture" },
            { id_level: 5, name_task: "Weeks of hobbies" },
            { id_level: 5, name_task: "Weeks of books" },
            { id_level: 6, name_task: "Weeks of sport" },
            { id_level: 6, name_task: "Weeks of languages" },
            { id_level: 6, name_task: "Weeks of food" },
            { id_level: 6, name_task: "Weeks of music" },
            { id_level: 6, name_task: "Weeks of culture" },
            { id_level: 6, name_task: "Weeks of hobbies" },
            { id_level: 6, name_task: "Weeks of books" },
            { id_level: 7, name_task: "Weeks of sport" },
            { id_level: 7, name_task: "Weeks of languages" },
            { id_level: 7, name_task: "Weeks of food" },
            { id_level: 7, name_task: "Weeks of music" },
            { id_level: 7, name_task: "Weeks of culture" },
            { id_level: 7, name_task: "Weeks of hobbies" },
            { id_level: 7, name_task: "Weeks of books" },
            { id_level: 8, name_task: "Weeks of sport" },
            { id_level: 8, name_task: "Weeks of languages" },
            { id_level: 8, name_task: "Weeks of food" },
            { id_level: 8, name_task: "Weeks of music" },
            { id_level: 8, name_task: "Weeks of culture" },
            { id_level: 8, name_task: "Weeks of hobbies" },
            { id_level: 8, name_task: "Weeks of books" },
        ];

        await Promise.all(tasks.map(task => taskRepository.createTask(task)));

        res.status(200).end();
    } catch (e) {
        console.error(e);
        res.status(500).send('Internal Server Error');
    }
});


router.get('/getAll', async (req, res) => {
    try{
        let task = await taskRepository.getAllTask();
        res.status(200).send(task)
    } catch (e) {
        console.log(e)
        res.status(500).send('Error')
    }
});

router.get('/level/:id_level', async (req, res) => {
    try{
        let taskLevel = await taskRepository.getTaskLevel(req.params.id_level);
        res.status(200).send(taskLevel)
    } catch (e) {
        console.log(e)
        res.status(500).send('Error')
    }
});




exports.initializeRoutes = () => router;
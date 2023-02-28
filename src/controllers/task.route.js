const express = require('express');
const router = express.Router();
require('dotenv').config()
const {Task} = require("../models/task.model");
const taskRepository = require("../repositories/task-repository");

router.post('/post', async (req, res) => {
    try {
        await taskRepository.createTask({
            id_level : 1,
            name_task: "yoga"
        });
        await taskRepository.createTask({
            id_level : 1,
            name_task: "run"
        });
        await taskRepository.createTask({
            id_level : 1,
            name_task: "swim"
        });
        await taskRepository.createTask({
            id_level : 1,
            name_task: "read"
        });
        await taskRepository.createTask({
            id_level : 1,
            name_task: "listen"
        });
        await taskRepository.createTask({
            id_level : 1,
            name_task: "walk"
        });
        await taskRepository.createTask({
            id_level : 1,
            name_task: "go"
        });
        await taskRepository.createTask({
            id_level : 2,
            name_task: "Weeks of sport"
        });
        await taskRepository.createTask({
            id_level : 2,
            name_task: "Weeks of languages"
        });
        await taskRepository.createTask({
            id_level : 2,
            name_task: "Weeks of food"
        });
        await taskRepository.createTask({
            id_level : 2,
            name_task: "Weeks of music"
        });
        await taskRepository.createTask({
            id_level : 2,
            name_task: "Weeks of culture"
        });
        await taskRepository.createTask({
            id_level : 2,
            name_task: "Weeks of hobbies"
        });
        await taskRepository.createTask({
            id_level : 2,
            name_task: "Weeks of books"
        });
        await taskRepository.createTask({
            id_level : 3,
            name_task: "Weeks of sport"
        });
        await taskRepository.createTask({
            id_level : 3,
            name_task: "Weeks of languages"
        });
        await taskRepository.createTask({
            id_level : 3,
            name_task: "Weeks of food"
        });
        await taskRepository.createTask({
            id_level : 3,
            name: "Weeks of music"
        });
        await taskRepository.createTask({
            id_level : 3,
            name_task: "Weeks of culture"
        });
        await taskRepository.createTask({
            id_level : 3,
            name_task: "Weeks of hobbies"
        });
        await taskRepository.createTask({
            id_level : 3,
            name_task: "Weeks of books"
        });
        await taskRepository.createTask({
            id_level : 4,
            name_task: "Weeks of sport"
        });
        await taskRepository.createTask({
            id_level : 4,
            name_task: "Weeks of languages"
        });
        await taskRepository.createTask({
            id_level : 4,
            name_task: "Weeks of food"
        });
        await taskRepository.createTask({
            id_level : 4,
            name_task: "Weeks of music"
        });
        await taskRepository.createTask({
            id_level : 4,
            name_task: "Weeks of culture"
        });
        await taskRepository.createTask({
            id_level : 4,
            name_task: "Weeks of hobbies"
        });
        await taskRepository.createTask({
            id_level : 4,
            name_task: "Weeks of books"
        });

        res.status(200).end()
    } catch (e) {
        res.status(500);
    }
});

router.post('/post2', async (req, res) => {
    try {
        await taskRepository.createTask({
            id_level : 4,
            name_task: "Weeks of music"
        });
        await taskRepository.createTask({
            id_level : 4,
            name_task: "Weeks of culture"
        });
        await taskRepository.createTask({
            id_level : 4,
            name_task: "Weeks of hobbies"
        });
        await taskRepository.createTask({
            id_level : 4,
            name_task: "Weeks of books"
        });

        res.status(200).end()
    } catch (e) {
        res.status(500);
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
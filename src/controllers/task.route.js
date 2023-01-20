const express = require('express');
const router = express.Router();
const taskRepository = require('../models/task-repository');
require('dotenv').config()


const {Task} = require("../models/task.model");

router.get('/task', async (req, res) => {
    try {
        await taskRepository.createTask({
            id_task : 1,
            id_level : 1,
            name_task: "yoga"
        });
        await taskRepository.createTask({
            id_task : 2,
            id_level : 1,
            name_task: "run"
        });
        await taskRepository.createTask({
            id_task : 3,
            id_level : 1,
            name_task: "swim"
        });
        await taskRepository.createTask({
            id_task : 4,
            id_level : 1,
            name_task: "read"
        });
        await taskRepository.createTask({
            id_task : 5,
            id_level : 1,
            name_task: "listen"
        });
        await taskRepository.createTask({
            id_task : 6,
            id_level : 1,
            name_task: "walk"
        });
        await taskRepository.createTask({
            id_task : 7,
            id_level : 1,
            name_task: "go"
        });
        await taskRepository.createTask({
            id_task : 8,
            id_level : 2,
            name_task: "Weeks of sport"
        });
        await taskRepository.createTask({
            id_task : 9,
            id_level : 2,
            name_task: "Weeks of languages"
        });
        await taskRepository.createTask({
            id_task : 10,
            id_level : 2,
            name_task: "Weeks of food"
        });
        await taskRepository.createTask({
            id_task : 11,
            id_level : 2,
            name_task: "Weeks of music"
        });
        await taskRepository.createTask({
            id_task : 12,
            id_level : 2,
            name_task: "Weeks of culture"
        });
        await taskRepository.createTask({
            id_task : 13,
            id_level : 2,
            name_task: "Weeks of hobbies"
        });
        await taskRepository.createTask({
            id_task : 14,
            id_level : 2,
            name_task: "Weeks of books"
        });
        await taskRepository.createTask({
            id_task : 15,
            id_level : 3,
            name_task: "Weeks of sport"
        });
        await taskRepository.createTask({
            id_task : 16,
            id_level : 3,
            name_task: "Weeks of languages"
        });
        await taskRepository.createTask({
            id_task : 17,
            id_level : 3,
            name_task: "Weeks of food"
        });
        await taskRepository.createTask({
            id_task : 18,
            id_level : 3,
            name: "Weeks of music"
        });
        await taskRepository.createTask({
            id_task : 19,
            id_level : 3,
            name_task: "Weeks of culture"
        });
        await taskRepository.createTask({
            id_task : 20,
            id_level : 3,
            name_task: "Weeks of hobbies"
        });
        await taskRepository.createTask({
            id_task : 21,
            id_level : 3,
            name_task: "Weeks of books"
        });
        await taskRepository.createTask({
            id_task : 22,
            id_level : 4,
            name_task: "Weeks of sport"
        });
        await taskRepository.createTask({
            id_task : 23,
            id_level : 4,
            name_task: "Weeks of languages"
        });
        await taskRepository.createTask({
            id_task : 24,
            id_level : 4,
            name_task: "Weeks of food"
        });
        await taskRepository.createTask({
            id_task : 25,
            id_level : 4,
            name_task: "Weeks of music"
        });
        await taskRepository.createTask({
            id_task : 26,
            id_level : 4,
            name_task: "Weeks of culture"
        });
        await taskRepository.createTask({
            id_task : 27,
            id_level : 4,
            name_task: "Weeks of hobbies"
        });
        await taskRepository.createTask({
            id_task : 28,
            id_level : 4,
            name_task: "Weeks of books"
        });


        const levels = await Task.findAll();

        res.status(200).send(levels)
    } catch (e) {
        res.status(500);
    }
});

exports.initializeRoutes = () => router;
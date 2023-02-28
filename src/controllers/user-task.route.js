const express = require('express');
const router = express.Router();
const taskUserRepository = require('../repositories/user-task-repository');
const taskRepository = require('../repositories/task-repository');
const levelUserRepository = require("../repositories/user-level-repository");
require('dotenv').config()


router.post('/post', async (req, res) => {
    try {
        // const start = Date.now();
        // const tu1 = await taskUserRepository.createUserTask({
        //     id_user_task: 1,
        //     id_user: 'a4792539-1605-404e-a7ea-4e7355aaa4d1',
        //     id_level: 1,
        //     id_task: 1,
        //     task_date_start: start,
        //     task_date_end: start
        //
        // });
        const start = Date.now();
        const tu1 = await taskUserRepository.createUserTask({
            id_user_task: 2,
            id_user: '9bf48a5a-dbbf-4d97-ae18-16c2a62f6220',
            id_level: 1,
            id_task: 1,
            task_date_start: start,
            task_date_end: start

        });
        res.status(200).end()
    } catch (e) {
        res.status(500).send(e)
    }
});

router.get('/get-task/:id_task', async (req, res) => {
    const foundTask = await taskRepository.getTask(req.params.id_task);
    if (!foundTask) {
        res.status(500).send('Task not found');
        return;
    }
    res.status(200).send(foundTask);
});

router.get('/getAll', async (req, res) => {
    try{
        res.send( await taskUserRepository.getAllUserTask());
        res.status(200).end()
    } catch (e) {
        res.status(500).send('Error')
    }
});

router.get('/:id_user', async (req, res) => {
    const foundUserTask = await taskUserRepository.getUserTask(req.params.id_user);
    console.log(foundUserTask)

    if (!foundUserTask) {
        res.status(500).send('user not found');
        return;
    }
    res.send(foundUserTask);
});

router.post('/updateTask/:id_user', async (req, res) => {
    try{
        let foundUserTask = await taskUserRepository.getUserTask(req.params.id_user);
        foundUserTask.id_task += 1;
        let updatedTasks =  await foundUserTask.update({ id_task: foundUserTask.id_task });
        console.log(updatedTasks);
        res.status(200).send('User tasks updated successfully');
    } catch (e) {
        console.error(e);
        res.status(500).send('Error updating user tasks');
    }
})


exports.initializeRoutes = () => router;
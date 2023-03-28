const express = require('express');
const router = express.Router();
const taskUserRepository = require('../repositories/user-task-repository');
const taskRepository = require('../repositories/task-repository');
require('dotenv').config()

router.get('/get-task/:id_task', async (req, res) => {
    try {
        const foundTask = await taskRepository.getTask(req.params.id_task);
        if (!foundTask) {
            res.status(500).send('Task not found');
            return;
        }
        res.status(200).send(foundTask);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});

router.get('/getAll', async (req, res) => {
    try{
        res.send( await taskUserRepository.getAllUserTask());
        res.status(200).end()
    } catch (e) {
        res.status(500).send('Error')
    }
});

    router.put('/updateCheckBox/:id_user/:id_task', async (req, res) => {
    const { id_user, id_task } = req.params;

    try {
        const userTask = await taskUserRepository.getUserTaskByIdTask(id_user, id_task);

        if (!userTask) {
            return res.status(404).send('User_task or User_id not found');
        }

        userTask.checkBox = !userTask.checkBox;
        await userTask.save();

        return res.send(userTask);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal server error');
    }
});

router.put('/updateTimeTask/:id_user/:id_task', async (req, res) => {
    const { id_user, id_task } = req.params;

    try {
        const userTask = await taskUserRepository.getUserTaskByIdTask(id_user, id_task);

        if (!userTask) {
            return res.status(404).send('User_task or User_id not found');
        }

        const date = new Date();
        const dateParis = date.setHours(date.getHours() + 1);
        // const options = {
        //     day: 'numeric',
        //     month: 'numeric',
        //     year: 'numeric',
        //     hour: 'numeric',
        //     minute: 'numeric',
        //     timeZone: 'Europe/Paris'
        // };
        // const formattedDate = new Intl.DateTimeFormat('en-GB', options).format(date);
        userTask.task_date_end = dateParis
        await userTask.save();

        return res.send(userTask);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal server error');
    }
});

router.get('/getIdTask/:id_user/:id_task', async (req, res) => {
    const { id_user, id_task } = req.params;

    try {
        const userTask = await taskUserRepository.getUserTaskByIdTask(id_user, id_task);

        if (!userTask) {
            return res.status(404).send('User_task or User_id not found');
        }

        return res.send(userTask);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal server error');
    }
});

router.get('/infoTask/:id_user', async (req, res) => {
    try {
        const findUserTask = await taskUserRepository.getUserTaskById(req.params.id_user);
        console.log(req.params.id_user)
        if(!findUserTask) {
            res.status(500).send('Id not found')
            return
        }
        res.status(200).send(findUserTask)
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});

router.put('/nextTasks/:id_user/:id_task', async (req, res) => {
    try{
        const { id_user, id_task } = req.params;
        let nextTasks = await taskUserRepository.setNextTasks(id_user, id_task);
        console.log(nextTasks);
        res.status(200).send('User tasks updated successfully');
    } catch (e) {
        console.error(e);
        res.status(500).send('Error updating user task');
    }
})

router.get('/tasksOfLevel/:id_user', async (req, res) => {
    try {
        const findUserTasks = await taskUserRepository.getAllTaskOfLevel(req.params.id_user);
        console.log(req.params.id_user)
        if(!findUserTasks) {
            res.status(500).send('Id not found')
            return
        }
        res.status(200).send(findUserTasks)
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});

exports.initializeRoutes = () => router;
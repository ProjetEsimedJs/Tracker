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
    const foundUserTask = await taskUserRepository.getUserTaskById(req.params.id_user);
    console.log(foundUserTask)

    if (!foundUserTask) {
        res.status(500).send('user not found');
        return;
    }
    res.send(foundUserTask);
});

router.put('/updateTask/:id_user', async (req, res) => {
    try{
        let foundUserTask = await taskUserRepository.getUserTaskById(req.params.id_user);
        foundUserTask.id_task += 1;
        let updatedTasks =  await foundUserTask.update({ id_task: foundUserTask.id_task });
        console.log(updatedTasks);
        res.status(200).send('User tasks updated successfully');
    } catch (e) {
        console.error(e);
        res.status(500).send('Error updating user tasks');
    }
})

// router.put('/updateDefaultData/:id_user', async (req, res) => {
//     try {
//         const userId = req.params.id_user;
//         let updatedDefaultData = taskUserRepository.updateUserTaskDefaultData(userId)
//         console.log(updatedDefaultData)
//         res.status(200).json({ message: 'User task updated successfully.' });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Internal server error.' });
//     }
// });

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
    const findUserTask = await taskUserRepository.getUserTaskById(req.params.id_user);
    console.log(req.params.id_user)
    if(!findUserTask) {
        res.status(500).send('Id not found')
        return
    }
    res.status(200).send(findUserTask)
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
    const findUserTasks = await taskUserRepository.getAllTaskOfLevel(req.params.id_user);
    console.log(req.params.id_user)
    if(!findUserTasks) {
        res.status(500).send('Id not found')
        return
    }
    res.status(200).send(findUserTasks)
});


exports.initializeRoutes = () => router;
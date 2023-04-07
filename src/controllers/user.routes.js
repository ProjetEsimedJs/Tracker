const express = require('express');
const router = express.Router();
const userRepository = require('../repositories/user-repository');
const { body, validationResult } = require('express-validator');

router.post('/seeder-user', async (req, res) => {
    const user =
        {
            firstName: 'User',
            lastName: 'User1',
            nickname: 'test',
            age: 25,
            email: 'seeder@example.com',
            password: 'password'
        };

    try {
        await userRepository.createUser(user);
        res.status(200).send('Seeded users successfully!');
    } catch (err) {
        console.log(err);
        res.status(500).send('Failed to seed users.');
    }
});

router.get('/info/:id_user', async (req, res) => {
    try {
        const findUserId = await userRepository.getUserById(req.params.id_user);
        if (!findUserId) {
            res.status(500).send('Id not found');
            return;
        }
        res.status(200).send(findUserId);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});


router.get('/getAll', async (req, res) => {
    try {
        const users = await userRepository.getUsers();
        res.send(users);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});

router.post('/create',
    body('firstName').isAlphanumeric().isLength({ min: 2 }),
    body('lastName').isAlphanumeric().isLength({ min: 2 }),
    body('nickname').isAlphanumeric().isLength({ min: 3 }),
    body('age').isNumeric().isLength({ min: 1 }),
    body('email').isEmail().isLength({ min: 5 }),
    body('password').isLength({ min: 5 }),
  // body('isAdmin').isAlphanumeric(),
      async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        const existingUser = await userRepository.getUserByEmail(req.body.email)
        console.log(existingUser)
        if(existingUser){
         return   res.status(401).json({ error: "Unable to create the user" });

        } else {
            await userRepository.createUser(req.body);
         return   res.status(201).end('Created successfully');
        }
    } catch (e) {
        res.status(500).send(e)
    }
});

router.put('/update-user/:id_user',
    async (req, res) => {
    try {
        let userUpdate = await userRepository.updateUser(req.params.id_user, req.body);
        res.status(201).send(userUpdate);
    } catch (e) {
        console.log(e)
        res.send(e).end();
    }
    });


// router.delete('/:id', guard.check(['admin']), async (req, res) => {
//     try {
//         await userRepository.deleteUser(req.params.id);
//         res.status(204).end();
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Internal server error');
//     }
// });


exports.initializeRoutes = () => router;

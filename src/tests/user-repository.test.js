const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const { createUser } = require('../repositories/user-repository');
const { getUserByEmail, getUserById, getUsers } = require('../repositories/user-repository');
const { User } = require('../models/user.model');

// jest.mock('bcryptjs');
// jest.mock('uuid');
// jest.mock('../models/user.model.js');
// jest.mock('../repositories/user-repository');
// describe('createUser', () => {
//
//     it('should create a new user', async () => {
//         const user = { password: 'qwerty' };
//         const mockSalt = 'mockSalt';
//         const mockHashedPassword = 'hashedPassword';
//         const mockUUID = 'fake-uuid';
//
//         // const body = { password: 'qwerty' };
//         // const salt = bcrypt.genSaltSync(10);
//         // const hashedPassword = bcrypt.hashSync(body.password, salt);
//         // const user = body;
//         // let id = uuid.v4();
//         // user.id_user = id;
//         // user.password = hashedPassword;
//
//         const expectedUser = {
//             password: mockHashedPassword,
//             id_user: mockUUID,
//         };
//
//         const result = await createUser(user);
//
//        expect(result).toEqual(expectedUser);
//        // expect(bcrypt.genSaltSync).toHaveBeenCalledWith(10);
//         //expect(bcrypt.hashSync).toHaveBeenCalledWith('qwerty', mockSalt);
//      //   expect(uuid.v4).toHaveBeenCalled();
//     });
// });

describe('testing getUserByEmail', () => {
    it('should find a user by email', async () => {
        const email = 'test@example.com';
        const user = {
            id_user: '1234567890987654321',
            firstName: 'test',
            lastName: 'test2',
            nickname: 'test3',
            age : 22,
            email: email,
            password: 'password'
        };
        jest.spyOn(User, 'findOne').mockResolvedValue(user);
        const result = await getUserByEmail(email);

        expect(User.findOne).toHaveBeenCalledWith({ where: { email } });
        expect(result).toEqual(user);
    });
});

describe('testing getUserById', () => {
    it('should find a user by id', async () => {
        const id_user = '1234567890987654321';
        const user = {
            id_user: id_user,
            firstName: 'test',
            lastName: 'test2',
            nickname: 'test3',
            age : 22,
            email: 'test@gmail.com',
            password: 'password'
        };
        jest.spyOn(User, 'findOne').mockResolvedValue(user);
        const result = await getUserById(id_user);

        expect(User.findOne).toHaveBeenCalledWith({ where: { id_user } });
        expect(result).toEqual(user);
    });
});

describe('testing getUsers function in user repository', () => {
    it('should return an array of all users', async () => {
        const users = [
            {
                id_user: '1234567890987654321',
                firstName: 'John',
                lastName: 'Doe',
                nickname: 'johndoe',
                age: 30,
                email: 'johndoe@example.com',
                password: 'password123'
            },
            {
                id_user: '098765431234567790',
                firstName: 'Jane',
                lastName: 'Doe',
                nickname: 'janedoe',
                age: 28,
                email: 'janedoe@example.com',
                password: 'password456'
            }
        ];
        jest.spyOn(User, 'findAll').mockResolvedValue(users);

        const result = await getUsers();

        expect(User.findAll).toHaveBeenCalledWith();
        expect(result).toEqual(users);
    });
});
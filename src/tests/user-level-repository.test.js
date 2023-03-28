const { User_level } = require('../models/user_level.model');
const { getLevelUser, createDefaultUserLevel, createUserlevel  } = require('../repositories/user-level-repository')

describe('test user-level-repository getLevelUser', () => {
    it('should get a user level by id_user', async () => {
        const id_user = '1234567890987654321';
        const mockFindOne = jest.spyOn(User_level, 'findOne').mockResolvedValueOnce({ id_user });

        const userLevel = await getLevelUser(id_user);

        expect(mockFindOne).toHaveBeenCalledWith({ where: { id_user }});
        expect(userLevel.id_user).toEqual(id_user);
    });
});

describe('test user-level-repository create Default UserLevel', () => {
    it('creates a new default user level', async () => {

        User_level.create = jest.fn();
        const id_user = '1234567890987654321';
        await createDefaultUserLevel(id_user);

        expect(User_level.create).toHaveBeenCalledWith({
            id_user: id_user,
            id_level: 1
        });
    });
});

describe('test user-level-repository createUserLevel', () => {
    it('should create a user level', async () => {
        const body = {
            id_user: '1234567890987654321',
            id_level: 1
        };
        const mockCreate = jest.spyOn(User_level, 'create').mockResolvedValueOnce();

        await createUserlevel(body);

        expect(mockCreate).toHaveBeenCalledWith(body);
    });
});



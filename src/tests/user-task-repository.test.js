const { User_task } = require('../models/user_task.model');
const { getAllUserTask, getUserTaskByIdTask, createUserTask } = require('../repositories/user-task-repository');

describe('User-task repository', () => {
    const now = Date.now();
    const users = [    {
            id_user: '1234567890987654321',
            id_level: 1,
            id_task: 1,
            checkBox: false,
            task_date_end: now,
    },
        {
            id_user: '098765431234567790',
            id_level: 2,
            id_task: 2,
            checkBox: true,
            task_date_end: now,    },
        {
            id_user: '46176986855680336',
            id_level: 3,
            id_task: 3,
            checkBox: false,
            task_date_end: now,
        },
    ];

    describe('test user-task-repository getAllUserTask', () => {
        it('should find all users-tasks', async () => {
            jest.spyOn(User_task, 'findAll').mockResolvedValue(users);

            const result = await getAllUserTask();

            expect(User_task.findAll).toHaveBeenCalledWith();
            expect(result).toEqual(users);
        });
    });

    describe('test user-task-repository getUserTaskByIdTask', () => {
        const id_user = '1234567890987654321';
        const id_task = 7;

        it('should get a user task by id_user and id_task', async () => {
            const mockFindOne = jest.spyOn(User_task, 'findOne').mockResolvedValueOnce({ id_user, id_task });

            const usertask = await getUserTaskByIdTask(id_user, id_task);

            expect(mockFindOne).toHaveBeenCalledWith({ where: { id_user, id_task } });
            expect([usertask.id_user, usertask.id_task]).toEqual([id_user, id_task]);
        });
    });

    describe('test user-task-repository createUserTask', () => {
        it('should create a user task', async () => {
            const body = {
                id_user: '1234567890987654321',
                id_level: 1,
                id_task: 7,
                checkBox: false,
                task_date_end: null,
            };
            const mockCreate = jest.spyOn(User_task, 'create').mockResolvedValueOnce();

            await createUserTask(body);

            expect(mockCreate).toHaveBeenCalledWith(body);
        });
    });
});

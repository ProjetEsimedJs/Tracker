
const { createTask, getTask } = require('../repositories/task-repository');
const { Task } = require('../models/task.model');

describe('test task-repository createTask', () => {
    it('should create a task', async () => {
        const body = { id_level: 1, name_task: 'Test Task' };
        const mockCreate = jest.spyOn(Task, 'create').mockResolvedValueOnce(body);

        await createTask(body);

        expect(mockCreate).toHaveBeenCalledWith(body);
    });
});

describe('test task-repository getTask', () => {
    it('should get a task by id_task', async () => {
        const id_task = 1;
        const mockFindOne = jest.spyOn(Task, 'findOne').mockResolvedValueOnce({ id_task });

        const task = await getTask(id_task);

        expect(mockFindOne).toHaveBeenCalledWith({ where: { id_task }});
        expect(task.id_task).toEqual(id_task);
    });
});
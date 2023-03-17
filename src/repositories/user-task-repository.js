const { User_task } = require('../models/user_task.model.js');
const date = require("date-and-time");

exports.getAllUserTask = async () => await User_task.findAll();

exports.getUserTaskById = async (id_user) => {
    let userTask = await User_task.findOne({ where: { id_user }});
    return userTask;
};

exports.getAllTaskOfLevel = async (id_user) => {
    let tasks = await User_task.findAll({ where: { id_user }});
    return tasks;
};

exports.createUserTask = async (body) => {
    await User_task.create(body);
};
    exports.createDefaultUserTask = async (user) => {
        let now = new Date();
        let dateEnd = date.addMinutes(now,1);

        const UserTasks = [1,2,3,4,5,6,7]

        for (const UserTask of UserTasks) {
            await User_task.create ({
                id_user : user,
                id_level : 1,
                id_task : UserTask,
                checkBox: false,
                task_date_start : now,
                task_date_end: dateEnd
            });
        }

}

exports.getUserTaskByIdTask = async (id_user, id_task) => {
    if (!id_task) {
        throw new Error('Invalid task ID');
    }
    const task = await User_task.findOne({
        where: { id_user, id_task },
    });
    return task;
};

exports.setNextTasks = async (id_user, id_task) => {
    let current_user_task = await this.getUserTaskByIdTask(id_user, id_task);
    if (!current_user_task || current_user_task.id_task === undefined) {
        throw new Error('Invalid user task or task ID');
    }
    await User_task.update({
        id_level: current_user_task.id_level + 1,
        id_task: current_user_task.id_task + 7,
        checkBox: current_user_task.checkBox = false
    }, {where: {id_user, id_task}});
}



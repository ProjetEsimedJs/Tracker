const { User_task } = require('../models/user_task.model.js');
const date = require("date-and-time");

exports.getAllUserTask = async () => await User_task.findAll();

exports.getUserTaskById = async (id_user) => {
    let userTask = await User_task.findOne({ where: { id_user }});
    return userTask;
};

exports.createUserTask = async (body) => {
    await User_task.create(body);
};
    exports.createDefaultUserTask = async (user) => {
        let now = new Date();
        let dateEnd = date.addMinutes(now,1);

        await User_task.create ({
            id_user : user,
            id_level : 1,
            id_task : 1,
            task_date_start : now,
            task_date_end: dateEnd
        });

      //  return {  id_level: 1, id_task: 1, now, dateEnd };
}

// exports.updateUserTaskDefaultData = async (id_user) => {
//     let userTasks = await this.getAllUserTask({
//         where: {
//             id_user: id_user,
//         },
//     });
//
//     let currentLevel = (await userLevelRepository.getLevelUser(id_user)).id_level
//     for (const userTask of userTasks) {
//         let currentTask = (await this.getUserTaskById(id_user))
//         let currentTaskId = currentTask.id_task
//         let currentTaskDateStart = currentTask.task_date_start
//         let currentTaskDateEnd = currentTask.task_date_end
//
//         await userTask.update({
//             id_level: currentLevel++,
//             id_task: currentTaskId+7,
//             task_date_start: currentTaskDateStart,
//             task_date_end: currentTaskDateEnd,
//         });
//     }

//};


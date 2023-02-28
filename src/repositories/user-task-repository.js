const { User_task } = require('../models/user_task.model.js');
const date = require("date-and-time");

exports.getAllUserTask = async () => await User_task.findAll();

exports.getUserTask = async (id_user) => {
    let userTask = await User_task.findOne({ where: { id_user }});
    return userTask;
};

exports.createUserTask = async (body) => {
    await User_task.create(body);
};
    exports.createDefaultUserTask = async (user) => {
        let now = new Date();

        await User_task.create ({
            id_user : user,
            id_level : 1,
            id_task : 1,
            task_date_start : now,
            task_date_end: date.addMinutes(now,1)
        });
}

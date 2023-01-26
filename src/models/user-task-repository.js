const { User_task } = require('../models/user_task.model.js');

exports.getAllUserTask = async () => await User_task.findAll();

exports.getTaskUser = async (id_user) => {
    return await User_task.findOne({ where: { id_user }});
};

exports.createUserTask = async (body) => {
    await User_task.create(body);
};

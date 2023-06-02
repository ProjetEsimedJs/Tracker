const { Task } = require('../models/task.model.js');


exports.getTask = async (id_task) => {
    let foundedTask = await Task.findOne({ where: { id_task }});
    return foundedTask;
};

exports.createTask = async (body) => {
    await Task.create(body);
};

exports.getNumberTask = async (id_task) => {
    let numberTask = await Task.findOne({ where: { id_task : id_task }});
    return numberTask;
};

exports.getTaskLevel = async (id_level) => {
    let foundedTaskByLevel = await Task.findAll({ where: { id_level }});
    return foundedTaskByLevel;
};
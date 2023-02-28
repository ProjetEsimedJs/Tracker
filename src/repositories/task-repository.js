const { Task } = require('../models/task.model.js');
const {User_task} = require("../models/user_task.model");


exports.getAllTask = async () => await Task.findAll();

exports.getTask = async (id_task) => {
    let foundedTask = await Task.findOne({ where: { id_task }});
    return foundedTask;
};

exports.createTask = async (body) => {
    await Task.create(body);
};

exports.getTaskLevel = async (id_level) => {
    let foundedTaskByLevel = await Task.findAll({ where: { id_level }});
    return foundedTaskByLevel;
};
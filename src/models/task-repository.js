const { Task } = require('../models/task.model.js');
const {User_task} = require("./user_task.model");


exports.getAllTask = async () => await Task.findAll();

exports.getTask = async (id_task) => {
    return await Task.findOne({ where: { id_task }});
};

exports.createTask = async (body) => {
    console.log(body)
    await Task.create(body);
};

exports.getTaskLevel = async (id_level) => {
    return await Task.findAll({ where: { id_level }});
};
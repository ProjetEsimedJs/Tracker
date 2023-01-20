const { Task } = require('../models/task.model.js');

exports.getTask = async () => await Task.findAll();

exports.createTask = async (body) => {
    await Task.create(body);
};
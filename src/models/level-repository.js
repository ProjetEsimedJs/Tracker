const { Level } = require('../models/level.model.js');

exports.getLevel = async () => await Level.findAll();

exports.createLevel = async (body) => {
    await Level.create(body);
};
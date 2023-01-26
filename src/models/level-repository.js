const { Level } = require('../models/level.model');

exports.getAllLevels = async () => await Level.findAll();

exports.getLevel = async (id_level) => {
    return await Level.findOne({ where: { id_level }});
};

exports.createLevel = async (body) => {
    await Level.create(body);
};
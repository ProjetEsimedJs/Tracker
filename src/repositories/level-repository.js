const { Level } = require('../models/level.model');

exports.getAllLevels = async () => await Level.findAll();

exports.getLevel = async (id_level) => {
    let foundedLevel = await Level.findOne({ where: { id_level }});
    return foundedLevel;
};

exports.createLevel = async (body) => {
    await Level.create(body);
};
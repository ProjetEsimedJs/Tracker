const { Level } = require('../models/level.model');
const {User} = require("../models/user.model");

exports.getAllLevels = async () => await Level.findAll();

exports.getLevel = async (id_level) => {
    let foundedLevel = await Level.findOne({ where: { id_level }});
    return foundedLevel;
};

exports.getNumberLevel = async (id_level) => {
    let numberLevel = await Level.findOne({ where: { id_level : id_level }});
    return numberLevel;
};

exports.createLevel = async (body) => {
    await Level.create(body);
};
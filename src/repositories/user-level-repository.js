
const { User_level } = require('../models/user_level.model.js');
const {isDate} = require("validator");
const date = require('date-and-time')
const {User} = require("../models/user.model");

exports.getAllUserLevel = async () => await User_level.findAll();

exports.getLevelUser = async (id_user) => {
    let userLevel = await User_level.findOne({ where: { id_user : id_user }});
    return userLevel;
};

exports.createUserlevel = async (body) => {
    await User_level.create(body);
};

exports.getUserLevelById =  async (id_user) => {
    let foundedUserById = await User_level.findOne({ where: { id_user }});
    return foundedUserById;
};

exports.createDefaultUserLevel = async (user) => {
    let now = new Date();

    await User_level.create({
        id_user : user,
        id_level : 1,
        level_date_start: now,
        level_date_end: date.addMinutes(now,1)
    });
}
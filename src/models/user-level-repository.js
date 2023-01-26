
const { User_level } = require('../models/user_level.model.js');

exports.getAllUserLevel = async () => await User_level.findAll();

exports.getLevelUser = async (id_user) => {
    return await User_level.findOne({ where: { id_user }});
};

exports.createUserlevel = async (body) => {
    await User_level.create(body);
};

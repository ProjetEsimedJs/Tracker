
const { User_level } = require('../models/user_level.model.js');

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
    await User_level.create({
        id_user: user,
        id_level: 1
    });
}
    exports.setNextLevel = async (id_user) => {
    let current_level = await this.getLevelUser(id_user);
    await User_level.update({
                id_level: current_level.id_level+1,
    }, {where : {id_user}});

};



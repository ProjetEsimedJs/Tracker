// const { users } = require('./db');
const uuid = require('uuid');
const { User } = require('../models/user.model.js');
const bcrypt = require('bcryptjs');
const {User_level} = require("./user_level.model");
const {Logger} = require("sequelize/lib/utils/logger");

exports.getUsers = async () => await User.findAll();


exports.getUserByEmail =  async (email) => {
  return await User.findOne({ where: { email }});
};

exports.getUserById =  async (id_user) => {
  return await User.findOne({ where: { id_user }});
};

exports.createUser = async (body) => {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(body.password, salt);
  const user = body;
  user.id_user = uuid.v4();
  user.password = hashedPassword;

  await User.create(user);
};

exports.updateUser =  async (id_user, data)  => {
  const foundUser = await User.findOne({ where: { id_user } });
  console.log(foundUser)

  if (!foundUser) {
    throw new Error('User not found');
  }

  let salt = bcrypt.genSaltSync(10);
  let hashedPassword = bcrypt.hashSync(data.password, salt);
  await User.update({
    firstName: data.firstName || foundUser.firstName,
    lastName: data.lastName || foundUser.lastName,
    nickname: data.nickname || foundUser.nickname,
    age: data.age || foundUser.age,
    email: data.email || foundUser.email,
    //password: data.password ? hashedPassword : foundUser.password,
    password: hashedPassword || foundUser.password,

  }, { where: { id_user } });
};





exports.deleteUser = async (id_user) => {
  await User.destroy({ where: { id_user } });
}

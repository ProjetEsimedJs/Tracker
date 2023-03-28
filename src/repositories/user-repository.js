// const { users } = require('./db');
const uuid = require('uuid');
const { User } = require('../models/user.model.js');
const bcrypt = require('bcryptjs');
const {createDefaultUserLevel} = require("./user-level-repository");
const {createDefaultUserTask} = require("./user-task-repository");

exports.getUsers = async () => await User.findAll();


exports.getUserByEmail =  async (email) => {
  let foundedUserByEmail = await User.findOne({ where: { email }});
  return foundedUserByEmail;
};

exports.getUserById =  async (id_user) => {
  let foundedUserById = await User.findOne({ where: { id_user }});
  return foundedUserById;
};

exports.createUser = async (body) => {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(body.password, salt);
  const user = body;
  let id = uuid.v4();
  user.id_user = id;
  user.password = hashedPassword;

  await User.create(user);

  await createDefaultUserLevel(user.id_user);

  await createDefaultUserTask(user.id_user);

};

exports.updateUser =  async (id_user, data)  => {
  const foundUser = await User.findOne({ where: { id_user } });

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

// const { users } = require('./db');
const uuid = require('uuid');
const { User } = require('../models/user.model.js');
const bcrypt = require('bcryptjs');

exports.getUsers = async () => await User.findAll();

exports.getUserByEmail =  async (email) => {
  return await User.findOne({ where: { email }});
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

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(body.password, salt);

  if (!foundUser) {
    throw new Error('User not found');
  }

  await User.update({
    firstName: data.firstName || foundUser.firstName,
    lastName: data.lastName || foundUser.lastName,
    password: data.password ? hashedPassword : foundUser.password,
    isAdmin: data.isAdmin || foundUser.isAdmin,

  }, { where: { id_user } });
};

exports.deleteUser = async (id_user) => {
  await User.destroy({ where: { id_user } });
}

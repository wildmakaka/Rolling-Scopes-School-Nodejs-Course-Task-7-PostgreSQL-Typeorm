// @ts-check

const _ = require('lodash');
const DBTasks = require('./InMemoryDbTasks');

/**
 * A User
 * @typedef {Object} User - User
 * @property {string} id - Id
 * @property {string} name - Name
 * @property {string} login - Login
 * @property {string} password - Password
 */

const DBUsers = [{}];

/**
 * ### Get All Users
 * @returns Promise<[User] | {}> - Promise with All Users or Promise with {}
 */
const getAllUsers = async () => DBUsers.slice(0);

/**
 * ### Get User
 * @param {string} id - user id
 * @returns {Promise<{User} | {}>} - Promise with User by id or Empty object
 */
const getUser = async (id) => {
  const allUsers = await getAllUsers();
  return allUsers.filter((el) => el.id === id)[0];
};

/**
 * ### Create User
 * @param {object} user - User body
 * @returns {Promise<{User} | {}>} - Promise with Created User or Empty object
 */
const createUser = async (user) => {
  DBUsers.push(user);
  return getUser(user.id);
};

/**
 * ### Remove User
 * @param {string} userId - User Id
 * @returns {Promise<User | {}>} - Promise with Deleted User or Empty object
 */
const removeUser = async (userId) => {
  const deletedUser = await getUser(userId);
  await _.remove(DBUsers, (user) => user.id === userId);
  await DBTasks.deleteUserFromTasks(userId);
  return deletedUser;
};

/**
 * ### Update User
 * @param {string} id - User Id
 * @param {object} body - User Body
 * @returns {Promise<User | {}>} - Promise with Updated User or Empty object
 */
const updateUser = async (id, body) => {
  await removeUser(id);
  await createUser(body);
  return getUser(id);
};

module.exports = { getAllUsers, getUser, createUser, updateUser, removeUser };
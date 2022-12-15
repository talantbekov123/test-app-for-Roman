const fsPromises = require('fs').promises;
const path = require('path');

const filename = path.resolve(`${__dirname}/users.txt`);
const { parseStringInput } = require('../utils');
const errors = require('../errors/index');

async function getUsers() {
  try {
    const result = (await fsPromises.readFile(filename)).toString();
    return parseStringInput(result);
  } catch (err) {
    if (err.code === 'ENOENT') {
      throw new errors.BadRequest('File users.txt is not found');
    } else {
      throw new errors.InternalServerError('Server error while reading users.txt file');
    }
  }
}

async function getUserById(userId) {
  try {
    let result = (await fsPromises.readFile(filename)).toString();
    result = parseStringInput(result);
    return result.filter((elem) => (elem.id === userId));
  } catch (err) {
    if (err.code === 'ENOENT') {
      throw new errors.BadRequest('File users.txt is not found');
    }
    throw new errors.InternalServerError('Server error while reading users.txt file');
  }
}

module.exports = {
  getUsers,
  getUserById,
};

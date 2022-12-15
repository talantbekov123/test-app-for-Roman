const database = require('../database/index');
const errors = require('../errors/index');

const getUsers = async (req, res, next) => {
  try {
    const users = await database.getUsers();
    res.status(200).send(users);
  } catch (err) {
    next(err);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await database.getUserById(userId);
    if (user.length === 0) {
      throw new errors.BadRequest('userId is not found');
    } else {
      res.status(200).send(user[0]);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUsers,
  getUserById,
};

const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500,
  standardHeaders: true,
  legacyHeaders: false,
});

const statusCodes = {
  error: 500,
  notFound: 404,
  badRequest: 400,
  created: 201,
  success: 200,
};

function parseStringInput(stringInput) {
  const data = stringInput.split('\n');
  data.pop();

  const result = [];
  /*eslint-disable */
  for (const elem of data) {
    const singleElem = {
      id: elem.split(' ')[0],
      email: elem.split(' ')[1],
      name: elem.split(' ')[2],
      password: elem.split(' ')[3],
    };
    result.push(singleElem);
  }

  return result;
}

module.exports = {
  statusCodes,
  limiter,
  parseStringInput,
};

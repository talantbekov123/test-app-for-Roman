const express = require('express');
const helmet = require('helmet');
const routes = require('./routes');
const { limiter } = require('./utils/index');
const errorHandler = require('./errors/errorHandler');

const { PORT = 3000 } = process.env;

const app = express();

app.use(helmet());
app.use(express.json());
app.use(limiter);

app.use(routes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});

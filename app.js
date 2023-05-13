require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');

const router = require('./routes/index');

const errorHandler = require('./middlewares/errorHandler');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');

const { PORT = 3000 } = process.env;

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(requestLogger);
app.use(cors);

app.use('/', router);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

mongoose
  .connect('mongodb://127.0.0.1:27017/bitfilmsdb')
  .then(() => {
    app.listen(PORT);
  });

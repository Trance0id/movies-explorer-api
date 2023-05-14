require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const { NODE_ENV, DB_ADDRESS, PORT = 3001 } = process.env;

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(requestLogger);
app.use(require('./middlewares/cors'));

app.use('/api', require('./routes/index'));

app.use(errorLogger);
app.use(errors());
app.use(require('./middlewares/errorHandler'));

mongoose
  .connect(NODE_ENV === 'production' ? DB_ADDRESS : 'mongodb://127.0.0.1:27017/bitfilmsdb')
  .then(() => {
    app.listen(PORT);
  });

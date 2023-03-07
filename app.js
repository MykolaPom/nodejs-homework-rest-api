const express = require('express')
const logger = require('morgan')
const cors = require('cors')
// const multer = require("multer");
require("dotenv").config();

const {errorHandler} = require('./helpers/apiHelper')

const contactsRouter = require('./routes/api/contacts');
const usersRouter = require('./routes/api/users');
// const filesRouter = require("./routes/api/files");

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())
app.use(express.static("public"));

// public / avatars / nodeJS.png;

app.use('/api/users', usersRouter)
app.use('/api/contacts', contactsRouter)
// app.use('/api/files', filesRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use(errorHandler);

module.exports = app

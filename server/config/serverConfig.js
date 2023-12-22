require('dotenv').config();
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const sessionConfig = require('./sessionConfig');

const config = (app) => {
  app.use(session(sessionConfig));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, '../public')));
  app.use(fileUpload());

  app.use(morgan('dev'));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
};

module.exports = config;

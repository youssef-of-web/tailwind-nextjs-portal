var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport')
const db = require('./config/keys.js').mongoURI;
const mongoose = require('mongoose');
require('dotenv').config()
var users = require('./controllers/users.controllers');
var profile = require('./controllers/profile.controllers');

var app = express();

mongoose.connect(db)
.then(()=>console.log('connection avec success to node'))
.catch((err)=>console.log(err))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

require('./config/Passport')(passport);

app.use('/api/users', users);
app.use('/api/profile', profile);

module.exports = app;

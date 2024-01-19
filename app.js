var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config()
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
var emailRoutes = require('./routes/email');


var cors = require('cors');
var mongoose = require('mongoose');

// var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth')
var influencerRouter = require('./routes/influencer')
var companyRoutes = require('./routes/company')
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.set('trust proxy', 1);
app.enable('trust proxy');

app.use(
    cors({
        origin: [process.env.REACT_APP_URI]  // <== URL of our future React app
    })
);

// app.use(
//     cors()
//   );

// app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/auth', authRouter)
app.use('/influencer', influencerRouter)
app.use('/company', companyRoutes)
app.use('/email', emailRoutes);

mongoose
    .connect(process.env.MONGODB_URI)
    .then((x) => {
        console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
    })
    .catch((err) => {
        console.error("Error connecting to mongo: ", err);
    });

module.exports = app;

require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
let fs = require('fs');

const MailEvent   = require("./MailEvent");
const Mailer        = new MailEvent();

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

app.post('/sendMail', async (req, res, next) => {
  let {email} = req.body;
  let {password} = req.query;

  if(password === process.env.PASSWORD){
    //check if email exist
    //if not, register new email and send mail
    // if true, reply with 'Already sign up, kindly check your mail for confirmation message.
    Mailer.emit('SEND_WELCOME_MAIL', email);
    return res.status(200).send({});
  }

  res.status(400).send({});
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

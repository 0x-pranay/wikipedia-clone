const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const wikiRouter = require('./routes/wiki');

const app = express();

// Passport config
require('./config/passport')(passport);

/// Set up Database connection
const mongoose = require('mongoose');

// DB config
const db = require('./config/keys').MongoURI;

// connect to Mongo
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> console.log('MongoDB connected....'))
  .catch(err => {
    console.log('Databse error: '+ err);
  });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// MIDDLEWARES
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: 'S3cr5t',
  resave: true,
  saveUninitialized: true,
}));

//Passport Middlewares
app.use(passport.initialize());
app.use(passport.session());

// Flash middlewarer
app.use(flash());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Global vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next(); 
});

app.use((req, res, next)=>{
  res.locals.user = req.user;
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/wiki', wikiRouter);


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
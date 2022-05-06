const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const userRouter = require('./routes/userRouter');

const app = express();

require('dotenv')
  .config();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Mongo init
try {
  mongoose.connect(process.env.DATABASE || "mongodb://0.0.0.0:27017/capstoneDB", 
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }
  );
  console.log("Connected to database");
} catch (error) {
  console.log(error);
}

// Upload storage
app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static('public/uploads'));

// Routes
app.use('/', [indexRouter, userRouter]);

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
  res.send(err.message);
});

module.exports = app;

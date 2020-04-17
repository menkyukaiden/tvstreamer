var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Webapp routes
var indexRouter = require('./routes/webapp/index');
var networkSettingsRouter = require('./routes/webapp/network_settings');
var tuningSettingsRouter = require('./routes/webapp/tuning_settings');
var dvblastSettingsRouter = require('./routes/webapp/dvblast_settings');
var optionsRouter = require('./routes/webapp/options');
var updateRouter = require('./routes/webapp/update');
var aboutRouter = require('./routes/webapp/about');

// API routes
var scanRouter = require('./routes/api/v1/dvbv5scan/scan');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Web app routes
app.use('/', indexRouter);
app.use('/network_settings', networkSettingsRouter);
app.use('/tuning_settings', tuningSettingsRouter);
app.use('/dvblast_settings', dvblastSettingsRouter);
app.use('/options', optionsRouter);
app.use('/update', updateRouter);
app.use('/about', aboutRouter);

// DVB api routes
app.use('/api/v1/dvbv5scan', scanRouter);

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

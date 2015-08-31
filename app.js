// .s5SSSs.  .s5SSSs.  .s5SSSs.  .s5SSSs.  
//       SS.       SS.       SS.       SS. 
// sS    S%S sS    `:; sS    `:; sS    S%S 
// SS    S%S SS        SS        SS    S%S 
// SS .sS;:' SSSs.     SSSs.     SS .sS::' 
// SS    ;,  SS        SS        SS        
// SS    `:; SS        SS        SS        
// SS    ;,. SS    ;,. SS    ;,. SS        
// `:    ;:' `:;;;;;:' `:;;;;;:' `:        


var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var Firebase = require('firebase');
//var sass = require('node-sass');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


var launchParams = {
  test: 'test'
}


/* GET index */
app.get('/', function(req, res, next) {
  res.locals.partial = 'tasks';
  res.render('layout', launchParams);
});

/* GET index */
app.get('/login', function(req, res, next) {
  res.locals.partial = 'login';
  res.render('layout', launchParams);
});

/* GET library */
app.get('/library', function(req, res, next) {
  res.locals.partial = 'library';
  res.render('layout', launchParams);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});



// Error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

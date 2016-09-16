var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.set('superSecret', require('./config/jwt'));//secret variable


app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});


app.post('/authenticate', function(req, res) {
  var User = require('./models/user');
     var Robot = require('./models/robot');
    
  // find the user
     Robot.aggregate([
        {
            "$group": {
                "_id": "$user",
                "robots": { "$push": "$$ROOT" }
            }
        }
    ]).exec(function(err, results){ 
        if (err) res.json({error: err});
        User.populate(results, { "path": "_id" }, function(err, result) {
            if(err) res.json({error: err});
            console.log(result);
            res.json(result);
        });
     });   
  /*User.findOne({
    username: req.body.username
  }, function(err, user,robot) {

    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found :-)' });
    } else if (user) {

      // check if password matches
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        // if user is found and password is right
        // create a token
        var token = jwt.sign(user, require('./config/jwt'), {
          //expiresInMinutes: 1440 // expires in 24 hours
        });
          
        // return the information including token as JSON

        res.json({user,              
          success: true, 
          message: 'Authenticated: Enjoy your token!',
          token: token,

        });
	
      }

    }

  }); 
    */
    
    
});

app.use('/', require('./routes'));
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/categories', require('./routes/categories'));
app.use('/equipements', require('./routes/equipements'));
app.use('/robots', require('./routes/robots'));
app.use('/rappels', require('./routes/rappels'));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

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

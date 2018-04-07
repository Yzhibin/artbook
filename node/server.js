var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Task = require('./api/models/schema'), //created model loading here
  bodyParser = require('body-parser');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/artbookDB');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Auth
var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  bcrypt = require('bcrypt')

app.use(require('express-session')({
  secret: 'session secret',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

var User = require('./api/models/schema').User;
passport.use(new LocalStrategy({
  usernameField: 'email'
},
  function (username, password, done) {
    console.log('LOG2')
    User.findOne({ id: username }, function (err, user) {
      console.log(user)
      if (err) { return done(err) }
      if (!user) {
        console.log('No such user')
        return done(null, false, { message: 'Incorrect username.' });
      }

      bcrypt.compare(password + user.salt, user.password, function (err, res) {
        if (!res) {
          console.log('Incorrect pwd')
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      })
    })
  }))

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findOne({ id: id }, function (err, user) {
    done(err, user);
  });
});


var routes = require('./api/routes/routes'); //importing route
routes(app, passport); //register the route


app.listen(port);


console.log('RESTful API server started on: ' + port);
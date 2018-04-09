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

// Authentication
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

var Schema = require('./api/models/schema'),
  User = Schema.User,
  Agency = Schema.Agency,
  Authority = Schema.Authority;

passport.use('user', new LocalStrategy({
  usernameField: 'email'
},
  function (username, password, done) {
    User.findOne({ id: username }, function (err, user) {
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

passport.use('agency', new LocalStrategy({
  usernameField: 'email'
},
  function (username, password, done) {
    Agency.findOne({ id: username }, function (err, user) {
      console.log(user)
      if (err) { return done(err) }
      if (!user) {
        console.log('No such agency')
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

passport.use('authority', new LocalStrategy({
  usernameField: 'account'
},
  function (username, password, done) {
    Authority.findOne({ id: username }, function (err, user) {
      console.log(user)
      if (err) { return done(err) }
      if (!user) {
        console.log('No such authority')
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
  var key = {
    id: user.id
  }
  if (user instanceof User)
    key.type = 'User'
  else if (user instanceof Agency)
    key.type = 'Agency'
  else if (user instanceof Authority)
    key.type = 'Authority'
  else console.log('serializeUser ERR: no match type')

  done(null, key);
});

passport.deserializeUser(function (key, done) {
  var Model
  if (key.type === 'User')
    Model = User
  if (key.type === 'Agency')
    Model = Agency
  else if (key.type === 'Authority')
    Model = Authority
  else console.log('deserializeUser ERR: no match type')

  Model.findOne({ id: key.id }, function (err, user) {
    done(err, user);
  });
});
// End of Authentication

var routes = require('./api/routes/routes'); //importing route
routes(app, passport); //register the route and passport module


app.listen(port);


console.log('RESTful API server started on: ' + port);
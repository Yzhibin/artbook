'use strict';
var bcrypt = require('bcrypt')
var mongoose = require('mongoose'),
  User = mongoose.model('User');
var userHandler = require('../../chainConnector/userHandler')

/**
 * 
 * userInfo:
 * email
 * name
 * avatar
 * password
 */
exports.createUser = function (req, res) {
  var userInfo = req.body
  var userOnChain = {
    userId: userInfo.email,
    name: userInfo.name,
    passport: userInfo.passport,
    mobile: userInfo.mobile
  }
  var userOffChain = {
    id: userInfo.email
  }

  bcrypt.genSalt(function (err, salt) {
    if (err) {
      console.log('bcrypt.genSalt ERR')
    }
    userOffChain.salt = salt
    bcrypt.hash(userInfo.password + salt, 10, function (err, hashed) {
      if (err) {
        console.log('bcrypt.hash ERR')
      }
      userOffChain.password = hashed

      // Chain
      var adminHandlesNewUser = new userHandler('admin@artbook')
      adminHandlesNewUser.createUser(userOnChain).then(
        function (result) {
          var new_user = new User(userOffChain)
          new_user.save(function (err, user) {
            if (err)
              res.send(err);
            else
              res.json({ email: userInfo.email });
          })
        })
    })
  })
};

exports.login = function (req, res) {
  var handlerInstance = new userHandler(req.body.email + '@artbook')
  handlerInstance.getUser(req.body.email).then(
    function (user) {
      res.json(user)
    })
};

exports.getUser = function (req, res) {
  User.findOne({ id: req.params.userId }, function (err, user) {
    if (err) { res.send(err) }
    if (!user) {
      console.log('User not found')
      res.status(404).send({ error: 'Invalid user email!' })
    }
  var handlerInstance = new userHandler(req.header('Id')+'@artbook')
  handlerInstance.getUser(req.params.userId).then(
    function (user) {
      res.json(user)
    })
  })
};
'use strict'
var agencyHandler = require('../../chainConnector/agencyHandler')

/**
 * 
 * userInfo:
 * email
 * name
 * password
 */
exports.createUser = function (req, res) {
    var userInfo = req.body
    var userOnChain = {
      userId: userInfo.email,
      name: userInfo.name,
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
        // var adminHandlesNewUser = new userHandler('admin@artbook')
        // adminHandlesNewUser.createUser(userOnChain)
  
        var new_user = new User(userOffChain)
        new_user.save(function (err, user) {
          if (err)
            res.send(err);
          res.json(user);
        })
      })
    })
  };

exports.login = function (req, res) {
    var handlerInstance = new userHandler(req.body.email.replace('@', '*') + '@artbook')
    var agency = handlerInstance.getUser(req.body.email)
    res.json(agency)
}
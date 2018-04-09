'use strict'
var bcrypt = require('bcrypt')
var agencyHandler = require('../../chainConnector/agencyHandler')
var mongoose = require('mongoose'),
  Agency = mongoose.model('Agency');

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
      var adminHandlesNewUser = new agencyHandler('admin@artbook')
      adminHandlesNewUser.createAgency(userOnChain).then(
        function (result) {
          var new_user = new Agency(userOffChain)
          new_user.save(function (err, agency) {
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
  var handlerInstance = new agencyHandler(req.body.email + '@artbook')
  handlerInstance.getAgency(req.body.email).then(
    function (agency) {
      res.json(agency)
    }
  )
}
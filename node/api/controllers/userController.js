'use strict';
var bcrypt = require('bcrypt')

//TODO
var mongoose = require('mongoose'),
  User = mongoose.model('User');

var userHandler = require('../../chainConnector/userHandler')

/*
exports.list_all_tasks = function(req, res) {
Task.find({}, function(err, task) {
  if (err)
    res.send(err);
  res.json(task);
});
};


*/

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
    id: userInfo.email,
    avatar: userInfo.avatar,
  }

  bcrypt.genSalt(function (err, salt) {
    if (err) {
      console.log('bcrypt.genSalt ERR')
    }
    console.log(`Salt: ${salt}`)
    userOffChain.salt = salt
    console.log(`userInfo.pwd: ${userInfo.password}`)
    userInfo.password = userInfo.password + salt
    
    bcrypt.hash(userInfo.password, 10, function (err, hashed) {
      if (err) {
        console.log('bcrypt.hash ERR')
      }
      console.log(`Hash: ${hashed} `)
      userOffChain.password = hashed

      var adminHandlesNewUser = new userHandler('admin@artbook')
      // adminHandlesNewUser.createUser(userOnChain)

      var new_user = new User(userOffChain)
      console.log(new_user)
      new_user.save(function (err, user) {
        if (err)
          res.send(err);
        res.json(user);
      })
    })
  })
};

/*
exports.read_a_task = function(req, res) {
  Task.findById(req.params.taskId, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.update_a_task = function(req, res) {
  Task.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.delete_a_task = function(req, res) {


  Task.remove({
    _id: req.params.taskId
  }, function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};

*/
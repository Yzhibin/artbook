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
    userOffChain.salt = salt
    bcrypt.hash(userInfo.password + salt, 10, function (err, hashed) {
      if (err) {
        console.log('bcrypt.hash ERR')
      }
      userOffChain.password = hashed

      // Chain
      var adminHandlesNewUser = new userHandler('admin@artbook')
      adminHandlesNewUser.createUser(userOnChain).then(
        function(result){
          var new_user = new User(userOffChain)
          new_user.save(function (err, user) {
            if (err)
              res.send(err);

            res.json({
              email: userInfo.email
            });
          })
        }
      )
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
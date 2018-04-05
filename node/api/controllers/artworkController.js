'use strict';

//TODO

var mongoose = require('mongoose'),
  Artwork = mongoose.model('Artwork');

  var artworkHandler = require('../../chainConnector/artworkHandler')

  /*
exports.list_all_tasks = function(req, res) {
  Task.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

*/

exports.createArtwork = function (req, res) {
  var artworkInfo = req.body
  var artworkOnChain = {
    artworkId: artworkInfo.artworkId,
    ownerId: artworkInfo.ownerId,
    title: artworkInfo.title,
    artist: artworkInfo.artist, 
    createTime : artworkInfo.createTime,
    location: artworkInfo.location,
    description: artworkInfo.description,

    // what else?
  }
  var artworkOffChain = {
    artworkId: artworkInfo.d,
    
  }

  var adminHandlesNewArtwork = new artworkHandler('admin@artbook')
  adminHandlesNewArtwork.createArtwork(artworkOnChain)

  var new_artwork = new Artwork(artworkOffChain)
  new_artwork.save(function (err, artwork) {
    if (err)
      res.send(err);
    res.json(artwork);
  })
};

// exports.addDocument = function (req, res) {
//   //TYPE!
// };

// exports.getDocuments = function (req, res) {

// };

// exports.getOwnArtworks = function (req, res) {

// };

// exports.getAgencyArtworks = function (req, res) {

// };


/*
exports.create_a_task = function(req, res) {
  var new_task = new Task(req.body);
  new_task.save(function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


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
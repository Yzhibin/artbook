'use strict';

var mongoose = require('mongoose'),
  Artwork = mongoose.model('Artwork');
var dateTime = require('node-datetime');


var artworkHandler = require('../../chainConnector/artworkHandler')
var documentHandler = require('../../chainConnector/documentHandler')

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
    ownerId: artworkInfo.ownerId,
    title: artworkInfo.title,
    artist: artworkInfo.artist,
    createTime: artworkInfo.createTime,
    location: artworkInfo.location,
    description: artworkInfo.description,

    // what else?
  }

  //create new artwork asset on chain
  var adminHandlesNewArtwork = new artworkHandler('admin@artbook')
  adminHandlesNewArtwork.createArtwork(artworkOnChain).then(
    function (artwork) {
      //create new artwork in mongoDB
      var artworkOffChain = {
        id: artwork.artworkId,
        name: artwork.title
      }
      var new_artwork = new Artwork(artworkOffChain)
      new_artwork.save(function (err, result) {
        if (err)
          res.send(err);
        //return artworkOnChain
        res.json(artwork);
      })
    }
  )
};

exports.addArtworkPic = function (req, res) {
  var pictureInfo = {
    artworkId: req.body.artworkId,
    fileId: req.body.fileId // documentId in mongoDB of the picture file
  }

  var adminHandlesNewArtwork = new artworkHandler('admin@artbook')
  adminHandlesNewArtwork.addPicture(pictureInfo).then(
    function (artwork) {
      console.log(artwork)
      //const json = JSON.stringify(artwork);
      res.send(artwork);
    })

};

exports.viewArtwork = function (req, res) {
  var adminHandlesNewArtwork = new artworkHandler('admin@artbook')
  adminHandlesNewArtwork.viewArtwork(req.params.artworkId).then(
    function (updatedArtwork) {
      res.json(updatedArtwork);
    })
};

exports.addDocumentToArtwork = function (req, res) {
  var documentInfo = { //on chain
    fileId: req.body.fileId,
    title: req.body.fileName,
    issueDate: req.body.issueDate,
    author: req.body.author,
    artworkId: req.body.artworkId,
    summary: req.body.summary
  }

  var adminHandlesNewDocument = new documentHandler('admin@artbook')
  adminHandlesNewDocument.addDocument(documentInfo).then(
    function (document) {
      //return updated artwork
      res.json(document);
    })
};

//Get all supporting documents of an artwork (by artworkId)
exports.getArtworkDocuments = function (req, res) {
  var adminHandlesNewDocument = new documentHandler('admin@artbook')
  adminHandlesNewDocument.getDocuments(req.params.artworkId).then(
    function (documents) {
      res.json(documents);
    })
};

exports.getOwnArtworks = function (req, res) {
  var adminHandlesNewArtwork = new artworkHandler('admin@artbook')
  adminHandlesNewArtwork.getOwnArtworks(req.params.ownerId).then(
    function (artworks) {
      res.json(artworks);
    })
};

exports.markMissing = function(req, res){
  var missingInfo = {
    artworkId : req.body.artworkId,
    documentId: req.body.documentId
  }
  var adminHandlesNewArtwork = new artworkHandler('admin@artbook')
  adminHandlesNewArtwork.markMissing(missingInfo).then(
    function (artworks) {
      res.json(artworks);
    })
}

exports.getAllMissing = function(req, res){
  var adminHandlesNewArtwork = new artworkHandler('admin@artbook')
  adminHandlesNewArtwork.getAllMissing().then(
    function (artworks) {
      res.json(artworks);
    })
}

exports.recoverMissing = function(req, res){
  var recoverInfo = {
    artworkId : req.body.artworkId,
    documentId: req.body.documentId
  }
  var adminHandlesNewArtwork = new artworkHandler('admin@artbook')
  adminHandlesNewArtwork.recoverMissing(recoverInfo).then(
    function (artworks) {
      res.json(artworks);
    })
}

exports.getAgencyArtworks = function (req, res) {
  var adminHandlesNewArtwork = new artworkHandler('admin@artbook')
  adminHandlesNewArtwork.getAgencyArtworks(req.params.agencyId).then(
    function (artworks) {
      res.json(artworks);
    })
};
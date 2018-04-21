'use strict';

var mongoose = require('mongoose'),
  Artwork = mongoose.model('Artwork');

var artworkHandler = require('../../chainConnector/artworkHandler')
var documentHandler = require('../../chainConnector/documentHandler')

exports.createArtwork = function (req, res) {
  var artworkInfo = req.body
  var artworkOnChain = {
    ownerId: artworkInfo.ownerId,
    title: artworkInfo.title,
    artist: artworkInfo.artist,
    createTime: artworkInfo.createTime,
    location: artworkInfo.location,
    description: artworkInfo.description,
  }

  //create new artwork asset on chain
  var artworkHandlerInstance = new artworkHandler(req.header('Id') + '@artbook')
  artworkHandlerInstance.createArtwork(artworkOnChain).then(
    function (artwork) {
      if (artwork instanceof Error)
        res.status(400).send({ error: 'Incorrect information. Blockchain error occured' })
      else {
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
    })
};

exports.addArtworkPic = function (req, res) {
  var pictureInfo = {
    artworkId: req.body.artworkId,
    fileId: req.body.fileId // documentId in mongoDB of the picture file
  }

  var artworkHandlerInstance = new artworkHandler(req.header('Id') + '@artbook')
  artworkHandlerInstance.addPicture(pictureInfo).then(
    function (artwork) {
      if (artwork instanceof Error)
        res.status(400).send({ error: 'Incorrect information. Blockchain error occured' })
      else {
        console.log(artwork)
        res.send(artwork);
      }
    })

};

exports.viewArtwork = function (req, res) {
  Artwork.findOne({ id: req.params.artworkId }, function (err, artwork) {
    if (err) { res.send(err) }
    if (!artwork) {
      console.log('Artwork not found')
      res.status(404).send({ error: 'Invalid ArtworkId!' })
    }
    //retrieve from chain
    var artworkHandlerInstance = new artworkHandler(req.header('Id') + '@artbook')
    artworkHandlerInstance.viewArtwork(req.params.artworkId).then(
      function (updatedArtwork) {
        if (updatedArtwork instanceof Error)
          res.status(400).send({ error: 'Incorrect information. Blockchain error occured' })
        else
          res.json(updatedArtwork);
      })
  })

};

exports.getAllArtworks = function (req, res) {
  //retrieve from chain
  var adminHandlesNewArtwork = new artworkHandler('admin@artbook')
  adminHandlesNewArtwork.getAllArtworks().then(
    function (artworks) {
      if (artworks instanceof Error)
        res.status(400).send({ error: 'Incorrect information. Blockchain error occured' })
      else
        res.json(artworks);
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

  var documentHandlerInstance = new documentHandler(req.header('Id') + '@artbook')
  documentHandlerInstance.addDocument(documentInfo).then(
    function (document) {
      if (document instanceof Error)
        res.status(400).send({ error: 'Incorrect information. Blockchain error occured' })
      else
        //return updated artwork
        res.json(document);
    })
};

//Get all supporting documents of an artwork (by artworkId)
exports.getArtworkDocuments = function (req, res) {
  var documentHandlerInstance = new documentHandler(req.header('Id') + '@artbook')
  documentHandlerInstance.getDocuments(req.params.artworkId).then(
    function (documents) {
      if (documents instanceof Error)
        res.status(400).send({ error: 'Incorrect information. Blockchain error occured' })
      else
        res.json(documents);
    })
};

exports.getOwnArtworks = function (req, res) {
  var artworkHandlerInstance = new artworkHandler(req.header('Id') + '@artbook')
  artworkHandlerInstance.getOwnArtworks(req.params.ownerId).then(
    function (artworks) {
      if (artworks instanceof Error)
        res.status(400).send({ error: 'Incorrect information. Blockchain error occured' })
      else
        res.json(artworks);
    })
};

exports.markMissing = function (req, res) {
  var missingInfo = {
    artworkId: req.body.artworkId,
    documentId: req.body.documentId
  }
  var artworkHandlerInstance = new artworkHandler(req.header('Id') + '@artbook')
  artworkHandlerInstance.markMissing(missingInfo).then(
    function (artworks) {
      if (artworks instanceof Error)
        res.status(400).send({ error: 'Incorrect information. Blockchain error occured' })
      else
        res.json(artworks);
    })
}

exports.getAllMissing = function (req, res) {
  var artworkHandlerInstance = new artworkHandler(req.header('Id') + '@artbook')
  artworkHandlerInstance.getAllMissing().then(
    function (artworks) {
      if (artworks instanceof Error)
        res.status(400).send({ error: 'Incorrect information. Blockchain error occured' })
      else
        res.json(artworks);
    })
}

exports.recoverMissing = function (req, res) {
  var recoverInfo = {
    artworkId: req.body.artworkId,
    documentId: req.body.documentId
  }
  var artworkHandlerInstance = new artworkHandler(req.header('Id') + '@artbook')
  artworkHandlerInstance.recoverMissing(recoverInfo).then(
    function (artworks) {
      if (artworks instanceof Error)
        res.status(400).send({ error: 'Incorrect information. Blockchain error occured' })
      else
        res.json(artworks);
    })
}

exports.getAgencyArtworks = function (req, res) {
  var artworkHandlerInstance = new artworkHandler(req.header('Id') + '@artbook')
  artworkHandlerInstance.getAgencyArtworks(req.params.agencyId).then(
    function (artworks) {
      if (artworks instanceof Error)
        res.status(400).send({ error: 'Incorrect information. Blockchain error occured' })
      else
        res.json(artworks);
    })
};
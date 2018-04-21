'use strict';

var fs = require('fs');

var mongoose = require('mongoose'),
  File = mongoose.model('File');

var documentHandler = require('../../chainConnector/documentHandler')



exports.upload = function (req, res) {

  var new_file = new File()
  new_file.img.data = fs.readFileSync(req.file.path)
  new_file.img.contentType = req.file.mimetype;
  new_file.name = req.file.originalname

  new_file.save(function (err, file) {
    fs.unlink(req.file.path, (error) => {
      if (err) console.log('Error while removing file');
      console.log('File is deleted');
    })
    if (err)
      res.send(err);
    else
      res.json(file.id);

  })
};

exports.retrieve = function (req, res) {

  console.log(req.params.id);
  File.findOne({ _id: req.params.id }, function (err, document) {
    if (err)
      res.send(err);
    console.log(document.name + "  found");

    res.setHeader('Content-Type', document.img.contentType);
    res.send(document.img.data);
  });
};

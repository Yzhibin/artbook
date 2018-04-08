'use strict';

// var Grid = require('gridfs-stream');
var fs = require('fs');

var mongoose = require('mongoose'),
File = mongoose.model('File');

  //var documentHandler = require('../../chainConnector/documentHandler')



  

exports.upload = function (req, res) {

  var new_file = new File() 
  new_file.img.data = fs.readFileSync(req.file.path)
  new_file.img.contentType = req.file.mimetype;
  new_file.name = req.file.originalname

  new_file.save(function (err, file) {
    if (err)
      res.send(err);
    res.json(file.id);
  })
};

'use strict';

//TODO
var Grid = require('gridfs-stream');
var fs = require('fs');
var busboy = require('connect-busboy');

var mongoose = require('mongoose'),
File = mongoose.model('File');

  //var documentHandler = require('../../chainConnector/documentHandler')


// file system
var conn = mongoose.connection;
Grid.mongo = mongoose.mongo;
var gfs;
conn.once('open', function () {
  console.log('open');
  gfs = Grid(conn.db);
});
  

exports.upload = function (req, res) {
  var part = req.file;
  console.log('file get!');
  console.log(typeof(req.file));
  var writeStream = gfs.createWriteStream({
      filename: 'img_test',
      mode: 'w',
      content_type: part.mimetype
  });

  writeStream.on('close', (file) => {
    // checking for file
    if(!file) {
      res.status(400).send('No file received');
    }
      return res.status(200).send({
          message: 'Success',
          file: file
      });
  });
  // using callbacks is important !
  // writeStream should end the operation once all data is written to the DB 
  writeStream.write(part.data, () => {
    writeStream.end();
  })
};

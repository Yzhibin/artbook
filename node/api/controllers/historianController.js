'use strict';

var historianHandler = require('../../chainConnector/historianHandler')

exports.viewAllHistory = function (req, res) {
  
    var handler = new historianHandler('admin@artbook')
    handler.viewAllHistory().then(
      function () {
        //console.log(artwork)
        //const json = JSON.stringify(artwork);
        res.send("success");
      })
  
  };
'use strict';

var historianHandler = require('../../chainConnector/historianHandler')

exports.viewConsentHistory = function (req, res) {
  
    var handler = new historianHandler('admin@artbook')
    handler.viewConsentHistory().then(
      function (records) {
        //console.log(artwork)
        //const json = JSON.stringify(artwork);
        res.send(records);
      })
  
  };

  exports.viewTransferHistory = function (req, res) {
  
    var handler = new historianHandler('admin@artbook')
    handler.viewTransferHistory(req.params.artworkId).then(
      function (records) {
        //console.log(artwork)
        //const json = JSON.stringify(artwork);
        res.send(records);
      })
  
  };
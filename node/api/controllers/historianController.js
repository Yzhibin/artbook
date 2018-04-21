'use strict';
var historianHandler = require('../../chainConnector/historianHandler')

exports.viewConsentHistory = function (req, res) {

  var handler = new historianHandler('admin@artbook')
  handler.viewConsentHistory().then(
    function (records) {
      if (records instanceof Error)
        res.status(400).send({ error: 'Incorrect information. Blockchain error occured' })
      else
        res.send(records);
    })

};

exports.viewTransferHistory = function (req, res) {

  var handler = new historianHandler('admin@artbook')
  handler.viewTransferHistory(req.params.artworkId).then(
    function (records) {
      if (records instanceof Error)
        res.status(400).send({ error: 'Incorrect information. Blockchain error occured' })
      else
        res.send(records);
    })

};
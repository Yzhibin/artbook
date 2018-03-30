'use strict';
module.exports = function(app) {
 
 
  var artwork = require('../controllers/artworkController');

  // Artwork Routes
  app.route('/artwork')
    .get(artwork.getAllArtworks)
    .post(artwork.createArtwork);


  app.route('/artwork/:artworkId')
    .get(artwork.getArtwork)
    .put(artwork.updateArtwork)
    .delete(artwork.deleteArtwork);
};
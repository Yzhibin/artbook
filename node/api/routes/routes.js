'use strict';
module.exports = function (app) {

  var artwork = require('../controllers/artworkController')
  var user = require('../controllers/userController')

  // Artwork Routes
  // app.route('/artwork')
  //   .get(artwork.getAllArtworks)
  //   .post(artwork.createArtwork);


  // app.route('/artwork/:artworkId')
  //   .get(artwork.getArtwork)
  //   .put(artwork.updateArtwork)
  //   .delete(artwork.deleteArtwork);

  // User Routes
  app.route('/user')
    // .get(user.getAllUsers)
    .post(user.createUser);

  // app.route('/user/:userId')
  //   .get(user.getUser)
  //   .put(user.updateUser)
    // .delete(user.deleteUser);
};
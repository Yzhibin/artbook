'use strict';
module.exports = function (app, passport) {

  var artwork = require('../controllers/artworkController')
  var user = require('../controllers/userController')
  var file = require('../controllers/fileController')

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

  // Artwork Routes
  app.route('/artwork')
    .post(artwork.createArtwork);

  app.route('/upload')
    .post(file.upload);


  app.route('/login')
  .post(passport.authenticate('local'), function (req, res) {
    res.json({status: 'Authenticated'});
  });

  app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });

};
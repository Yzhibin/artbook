'use strict';
module.exports = function (app, passport) {

  var artwork = require('../controllers/artworkController'),
    user = require('../controllers/userController'),
    agency = require('../controllers/agencyController'),
    authority = require('../controllers/authorityController'),
    file = require('../controllers/fileController'),
    consent = require('../controllers/consentController')

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

  app.post('/user/login', passport.authenticate('user'), user.login)

  app.post('/agency/login', passport.authenticate('agency'), agency.login)

  app.post('/authority/login', passport.authenticate('authority'), authority.login)

  app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });

  app.post('/agency/reqeustConsent', )

};
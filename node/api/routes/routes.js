'use strict';
module.exports = function (app, passport) {

  var artwork = require('../controllers/artworkController'),
    user = require('../controllers/userController'),
    agency = require('../controllers/agencyController'),
    authority = require('../controllers/authorityController'),
    file = require('../controllers/fileController'),
    consent = require('../controllers/consentController')

  var multer  = require('multer')
  var upload = multer({ dest: 'uploads/' })

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
    .post(artwork.createArtwork)
    .put(artwork.addArtworkPic);
 
  app.route('/artwork/:artworkId')
    .get(artwork.viewArtwork);

  app.route('/ownArtworks/:ownerId')
    .get(artwork.getOwnArtworks);

  app.route('/document')
  .post(artwork.addDocumentToArtwork);

  // app.route('/getDocuments/:artworkId')
  // .get(artwork.getDocuments);


  app.route('/upload')
    .post(upload.single('file'),file.upload);
  
  app.route('/retrieve/:id')
    .get(file.retrieve);


  app.post('/user/login', passport.authenticate('user'), user.login)

  app.post('/agency/login', passport.authenticate('agency'), agency.login)

  app.post('/authority/login', passport.authenticate('authority'), authority.login)

  app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });

  app.post('/agency/reqeustConsent', )

};
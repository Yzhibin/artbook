'use strict';
module.exports = function (app, passport) {

  var artwork = require('../controllers/artworkController'),
    user = require('../controllers/userController'),
    agency = require('../controllers/agencyController'),
    authority = require('../controllers/authorityController'),
    file = require('../controllers/fileController'),
    consent = require('../controllers/consentController'),
    historian = require('../controllers/historianController')

  var multer = require('multer')
  var upload = multer({ dest: 'uploads/' })

  // Artwork Routes
  // app.route('/artwork')
  //   .get(artwork.getAllArtworks)
  //   .post(artwork.createArtwork);


  // app.route('/artwork/:artworkId')
  //   .get(artwork.getArtwork)
  //   .put(artwork.updateArtwork)
  //   .delete(artwork.deleteArtwork);

  // Sign-up
  app.post('/user', user.createUser)
  app.post('/agency', agency.createUser)
  app.post('/branch', authority.createBranch)
  app.post('/police', authority.createPolice)
  // Login
  app.post('/user/login', passport.authenticate('user'), user.login)
  app.post('/agency/login', passport.authenticate('agency'), agency.login)
  app.post('/authority/login', passport.authenticate('authority'), authority.login)

  app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });

  // app.route('/user/:userId')
  //   .get(user.getUser)
  //   .put(user.updateUser)
  // .delete(user.deleteUser);

  app.get('/agency/getUser/:userId', user.getUser)

  // Artwork Routes
  app.route('/artwork')
    .post(artwork.createArtwork)
    .get(artwork.getAllArtworks)
    .put(artwork.addArtworkPic);

  app.route('/artwork/:artworkId')
    .get(artwork.viewArtwork);

  app.route('/missing')
    .put(artwork.markMissing)
    .get(artwork.getAllMissing);
  
  app.route('/recover')
    .put(artwork.recoverMissing);

  app.route('/ownArtworks/:ownerId')
    .get(artwork.getOwnArtworks);
  
  app.route('/agencyArtworks/:agencyId')
    .get(artwork.getAgencyArtworks);

  app.route('/document')
    .post(artwork.addDocumentToArtwork);

  app.route('/getDocuments/:artworkId')
  .get(artwork.getArtworkDocuments);


  app.route('/upload')
    .post(upload.single('file'), file.upload);

  app.route('/retrieve/:id')
    .get(file.retrieve);

  app.route('/consentHistory')
    .get(historian.viewConsentHistory);
  app.route('/transferHistory')
    .get(historian.viewTransferHistory);



  // Consent
  app.post('/agency/requestConsent', consent.requestForConsent)
  app.put('/user/consentForSale', consent.consentForSale)
  app.post('/agency/requestForPayment', consent.requestForPayment)
  app.get('/user/payment/:token', consent.pay)
  app.get('/user/transferOwnership/:token', consent.transferOwnership)
};
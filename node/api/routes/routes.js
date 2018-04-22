'use strict';
var artwork = require('../controllers/artworkController'),
  user = require('../controllers/userController'),
  agency = require('../controllers/agencyController'),
  authority = require('../controllers/authorityController'),
  file = require('../controllers/fileController'),
  consent = require('../controllers/consentController'),
  historian = require('../controllers/historianController')

var Schema = require('../models/schema'),
  User = Schema.User,
  Agency = Schema.Agency,
  Authority = Schema.Authority;

var multer = require('multer')
var upload = multer({ dest: 'uploads/' })
module.exports = function (app, passport) {

  // Authentication
  function isAuthenticated(req, res, next) {
    if (req.isAuthenticated())
      next()
    else
      res.status(403).send({ error: 'Please log in' });
  }

  function isAgency(req, res, next) {
    if (req.isAuthenticated() && req.user instanceof Agency)
      next()
    else
      res.status(403).send({ error: 'Agency identity is required' });
  }

  function isAuthority(req, res, next) {
    if (req.isAuthenticated() && req.user instanceof Authority)
      next()
    else
      res.status(403).send({ error: 'Authority identity is required' });
  }

  /*
    API Protection 
  */
  // Front-end not utilise cookie to maintain login session. API protector is not able to get login identity

  // app.all('*', function (req, res, next) {
  //   if (/^\/agency\/*/.test(req.path))
  //     isAgency(req, res, next)
  //   else if (/^\/missing\/*/.test(req.path) || /^\/recover\/*/.test(req.path))
  //     isAuthority(req, res, next)
  //   else
  //     isAuthenticated(req, res, next);
  // });

  app.all('*', function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')
    next()
  })

  app.get('/test', function (req, res) {
    res.json({ status: 'ok' })
  })

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
  app.route('/transferHistory/:artworkId')
    .get(historian.viewTransferHistory);



  // Consent
  app.post('/agency/requestConsent', consent.requestForConsent)
  app.put('/user/consentForSale', consent.consentForSale)
  app.post('/agency/requestForPayment', consent.requestForPayment)
  app.get('/user/payment/:token', consent.pay)
  app.get('/user/transferOwnership/:token', consent.transferOwnership)
};
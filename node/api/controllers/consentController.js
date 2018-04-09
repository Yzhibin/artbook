'use strict';
var mongoose = require('mongoose'),
    Artwork = mongoose.model('Artwork'),
    Token = mongoose.model('Token');
var artworkHandler = require('../../chainConnector/artworkHandler')
var agencyHandler = require('../../chainConnector/agencyHandler')
var bcrypt = require('bcrypt')
var mailer = require('./mailer')


/**
 * 
 * @param {*} req 
 * artworkId
 */
exports.requestForConsent = function (req, res) {
    bcrypt.genSalt(function (err, salt) {
        const artworkId = req.body.artworkId
        const agencyId = req.header('Id')
        const artworkHandlerInstance = new artworkHandler(`${agencyId}@artbook`)
        artworkHandlerInstance.viewArtwork(artworkId).then(
            function (artwork) {
                if (artwork.onSale)
                    res.send('Artwork is on sale')
                else {
                    const agencyHandlerInstance = new agencyHandler(`${agencyId}@artbook`)
                    agencyHandlerInstance.getAgency(agencyId)
                        .then(function (agency) {
                            var new_token = new Token({
                                token: salt,
                                type: 'Request',
                                agency: agency.email,
                                owner: artwork.owner.email,
                                artwork: artwork.id
                            })
                            new_token.save(function (err, token) {
                                if (err)
                                    res.send(err)
                                else {
                                    mailer.sendMail({
                                        receiverEmail: artwork.owner.email,
                                        receiverName: artwork.owner.name,
                                        mailType: 'ConsentForSale',
                                        agency: agency.name,
                                        artwork: artwork.title,
                                        otp: salt
                                    })
                                    res.json('Email sent')
                                }
                            })
                        })
                }
            })
    })
}
/**
 * 
 * @param {*} req 
 * otp
 */
exports.consentForSale = function (req, res) {
    const otp = req.body.otp
    const owner = req.header('Id')

    Token.findOne({token: otp}, function (err, token) {
        if (err || token.expired || token.owner !== owner)
            res.send('Invalid Token')
        else {
            const handlerInstance = new artworkHandler(`${token.owner}@artbook`)
            handlerInstance.consentForSale({
                agencyId: 'burabura@gmail.com', // token.agency,
                artworkId: '111e854c-8212-425f-8df0-c121b8954e4d' //token.artwork
            }).then(
                function (result) {
                    token.expired = true
                    token.update(function (err, done) {
                        if (err)
                            res.send(err)
                        else
                            res.json('Successful')
                    })
                }
            )
        }
    })
}
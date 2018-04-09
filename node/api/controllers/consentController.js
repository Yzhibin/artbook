'use strict';
var mongoose = require('mongoose'),
    Artwork = mongoose.model('Artwork'),
    Token = mongoose.model('Token');
var artworkHandler = require('../../chainConnector/artworkHandler')
var agencyHandler = require('../../chainConnector/agencyHandler')
var userHandler = require('../../chainConnector/userHandler')
var bcrypt = require('bcrypt')
var mailer = require('./mailer')
const host = 'localhost'


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
                res.status(404).send({error: 'Artwork is on sale'})
                else {
                    const agencyHandlerInstance = new agencyHandler(`${agencyId}@artbook`)
                    agencyHandlerInstance.getAgency(agencyId)
                        .then(function (agency) {
                            var new_token = new Token({
                                token: salt,
                                type: 'Request',
                                agency: agency.email,
                                owner: artwork.owner.email,
                                artwork: artwork.artworkId
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
                                        otp: salt,
                                        link: ``
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

    Token.findOne({ token: otp }, function (err, token) {
        if (err || token.expired || token.owner !== owner)
        res.status(404).send({error: 'Invalid Token'})
        else {
            const handlerInstance = new artworkHandler(`${token.owner}@artbook`)
            handlerInstance.consentForSale({
                agencyId: token.agency,
                artworkId: token.artwork
            }).then(function (result) {
                token.update({ expired: true }, function (err, done) {
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

exports.requestForPayment = function (req, res) {
    const buyerEmail = req.body.buyerEmail
    const artworkId = req.body.artworkId
    const price = req.body.price
    const agencyEmail = req.header('Id')

    const userHandlerInstance = new userHandler(agencyEmail + '@artbook')
    const agencyHandlerInstance = new agencyHandler(agencyEmail + '@artbook')
    const artworkHandlerInstance = new artworkHandler(agencyEmail + '@artbook')

    agencyHandlerInstance.getAgency(agencyEmail)
        .then(function (agency) {
            artworkHandlerInstance.viewArtwork(artworkId)
                .then(function (artwork) {
                    if (!artwork.onSale || artwork.handler.email !== agencyEmail)
                    res.status(404).send({error: 'Artwork not found'})
                    else {
                        userHandlerInstance.getUser(buyerEmail)
                            .then(function (buyer) {
                                bcrypt.genSalt(function (err, salt) {
                                    if (err)
                                        res.send(err)
                                    else {
                                        var token = new Token({
                                            token: salt,
                                            type: 'Pay',
                                            artwork: artwork.artworkId,
                                            agency: agencyEmail,
                                            buyer: buyer.email,
                                            owner: artwork.owner.email,
                                            price: price
                                        })
                                        token.save(function (err, result) {
                                            if (err)
                                                res.send(err)
                                            else {
                                                mailer.sendMail({
                                                    receiverEmail: buyerEmail,
                                                    receiverName: buyer.name,
                                                    mailType: 'BuyerPayment',
                                                    agency: agency.name,
                                                    artwork: artwork.title,
                                                    artist: artwork.artist,
                                                    createTime: artwork.createTime,
                                                    description: artwork.description,
                                                    price: price,
                                                    link: `localhost:8080/${salt}`
                                                    // backend api: ${host}:3000/user/payment/${salt}
                                                })
                                                res.json('Successful')
                                            }
                                        })
                                    }
                                })
                            })
                    }
                })
        })
}

exports.pay = function (req, res) {
    const token = req.params.token
    Token.findOne({ token: token }, function (err, result) {
        if (err)
            res.send(err)
        else if (result.expired)
        res.status(404).send({error: 'Invalid token'})
        else {
            const ownerEmail = result.owner
            const userHandlerInstance = new userHandler(ownerEmail + '@artbook')
            const agencyHandlerInstance = new agencyHandler(ownerEmail + '@artbook')
            const artworkHandlerInstance = new artworkHandler(ownerEmail + '@artbook')
            userHandlerInstance.getUser(ownerEmail)
                .then(function (owner) {
                    artworkHandlerInstance.viewArtwork(result.artwork)
                        .then(function (artwork) {
                            if (artwork.owner.email !== owner.email)
                                res.status(404).send({error: 'Artwork not found'})
                            else {
                                agencyHandlerInstance.getAgency(result.agency)
                                    .then(function (agency) {
                                        if (artwork.handler.email !== agency.email)
                                        res.status(404).send({error: 'Agency not found'})
                                        else {
                                            bcrypt.genSalt(function (err, salt) {
                                                if (err)
                                                    res.send(err)
                                                else {
                                                    var new_token = new Token({
                                                        token: salt,
                                                        type: 'Transfer',
                                                        artwork: result.artwork,
                                                        agency: result.agency,
                                                        buyer: result.buyer,
                                                        owner: result.owner,
                                                        price: result.price
                                                    })
                                                    new_token.save(function (err, saved) {
                                                        if (err)
                                                            res.send(err)
                                                        else {
                                                            result.update({ expired: true }, function (err, updated) {
                                                                if (err)
                                                                    res.send(err)
                                                                else {
                                                                    mailer.sendMail({
                                                                        receiverEmail: result.owner,
                                                                        receiverName: owner.name,
                                                                        mailType: 'ConsentTransfer',
                                                                        agency: agency.name,
                                                                        artwork: artwork.title,
                                                                        price: result.price,
                                                                        link: `${host}:3000/user/transferOwnership/${salt}`
                                                                    })
                                                                    res.json('Successful')
                                                                }
                                                            })
                                                        }
                                                    })
                                                }
                                            })
                                        }
                                    })
                            }
                        })
                })
        }
    })
}

exports.transferOwnership = function (req, res) {
    const token = req.params.token
    Token.findOne({ token: token }, function (err, result) {
        if (err)
            res.send(err)
        else if (result.expired)
        res.status(404).send({error: 'Invalid token'})
        else {
            const artworkHandlerInstance = new artworkHandler(result.agency + '@artbook')
            artworkHandlerInstance.transferOwnership({
                artworkId: result.artwork,
                agencyId: result.artwork,
                buyerId: result.buyer,
                price: result.price
            }).then(function (done) {
                result.update({ expired: true }, function (err, finished) {
                    if (err)
                        res.send(err)
                    else
                        res.json('Successful')
                })
            })

        }
    })
}
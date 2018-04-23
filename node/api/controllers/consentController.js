'use strict';
var mongoose = require('mongoose'),
    Artwork = mongoose.model('Artwork'),
    Token = mongoose.model('Token');
var artworkHandler = require('../../chainConnector/artworkHandler')
var agencyHandler = require('../../chainConnector/agencyHandler')
var userHandler = require('../../chainConnector/userHandler')
var randomGen = require('random-number').generator({ min: 100000, max: 999999, integer: true })
var mailer = require('./mailer')
// const host = 'http://52.187.128.189:3001'
const host = 'localhost:3001'
// const clientHost = 'http://40.65.191.47:8080'
const clientHost = 'localhost:8080'

/**
 * 
 * @param {*} req 
 * artworkId
 */
exports.requestForConsent = function (req, res) {
    const salt = randomGen()
    const artworkId = req.body.artworkId
    const agencyId = req.header('Id')
    const artworkHandlerInstance = new artworkHandler(`${agencyId}@artbook`)
    artworkHandlerInstance.viewArtwork(artworkId).then(
        function (artwork) {
            if (artwork instanceof Error)
                res.status(400).send({ error: 'Incorrect information. Blockchain error occured' })
            else if (artwork.onSale)
                res.status(404).send({ error: 'Artwork is on sale' })
            else {
                const agencyHandlerInstance = new agencyHandler(`${agencyId}@artbook`)
                agencyHandlerInstance.getAgency(agencyId)
                    .then(function (agency) {
                        if (agency instanceof Error)
                            res.status(400).send({ error: 'Incorrect information. Blockchain error occured' })
                        else {
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
                                        link: `${clientHost}/#/auth`
                                    })
                                    res.json('Email sent')
                                }
                            })
                        }
                    })
            }
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
    //console.log("Controller " + owner)

    Token.findOne({ token: otp }, function (err, token) {
        if (err || token.expired || token.owner !== owner)
            res.status(404).send({ error: 'Invalid Token' })
        else {
            const handlerInstance = new artworkHandler(`${token.owner}@artbook`)
            handlerInstance.consentForSale({
                agencyId: token.agency,
                artworkId: token.artwork
            }).then(function (result) {
                if (result instanceof Error)
                    res.status(400).send({ error: 'Incorrect information. Blockchain error occured' })
                else {
                    token.update({ expired: true }, function (err, done) {
                        if (err)
                            res.send(err)
                        else {
                            console.log("Consent For Sale Successfully!")
                            res.json('Successful')
                        }
                    })
                }
            })
        }
    })
}

exports.requestForPayment = function (req, res) {
    const buyerEmail = req.body.buyerEmail
    const artworkId = req.body.artworkId
    const price = req.body.price
    const agencyEmail = req.header('Id')

    const artworkHandlerInstance = new artworkHandler(agencyEmail + '@artbook')
    const userHandlerInstance = new userHandler(agencyEmail + '@artbook')

    artworkHandlerInstance.requestForDeposit({
        artworkId: artworkId,
        agencyId: agencyEmail,
        buyerId: buyerEmail,
        price: price
    }).then(function (done) {
        if (done instanceof Error)
            res.status(400).send({ error: 'Incorrect information. Blockchain error occured' })
        else {
            //save token to localDB
            const salt = randomGen()
            var token = new Token({
                token: salt,
                type: 'Pay',
                artwork: artworkId,
                agency: agencyEmail,
                buyer: buyerEmail,
                price: price
            })

            const artwork = artworkHandlerInstance.viewArtwork(artworkId).then(function (artwork) {
                if (artwork instanceof Error)
                    res.status(400).send({ error: 'Incorrect information. Blockchain error occured' })
                else {
                    const buyer = userHandlerInstance.getUser(buyerEmail).then(function (buyer) {
                        if (buyer instanceof Error)
                            res.status(400).send({ error: 'Incorrect information. Blockchain error occured' })
                        else {
                            token.save(function (err, result) {
                                if (err)
                                    res.send(err)
                                else {
                                    mailer.sendMail({
                                        receiverEmail: buyerEmail,
                                        receiverName: buyer.name,
                                        mailType: 'BuyerPayment',
                                        agency: artwork.handler.name,
                                        artwork: artwork.title,
                                        artist: artwork.artist,
                                        createTime: artwork.createTime,
                                        description: artwork.description,
                                        price: price,
                                        link: `${clientHost}/#/payment/${artwork.artworkId}/${price}/${salt}`
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

exports.pay = function (req, res) {
    const token = req.params.token
    Token.findOne({ token: token }, function (err, result) {
        if (err)
            res.send(err)
        else if (result.expired)
            res.status(404).send({ error: 'Invalid token' })
        else {
            const buyerEmail = result.buyer
            const artworkHandlerInstance = new artworkHandler(result.agency + '@artbook')
            const agencyHandlerInstance = new agencyHandler(result.agency + '@artbook')

            artworkHandlerInstance.confirmDeposit({
                artworkId: result.artwork,
                buyerId: buyerEmail,
            }).then(function (done) {
                if (done instanceof Error)
                    res.status(400).send({ error: 'Incorrect information. Blockchain error occured' })
                else {
                    const artwork = artworkHandlerInstance.viewArtwork(result.artwork).then(function (artwork) {
                        if (artwork instanceof Error)
                            res.status(400).send({ error: 'Incorrect information. Blockchain error occured' })
                        else {
                            const agency = agencyHandlerInstance.getAgency(result.agency).then(function (agency) {
                                if (agency instanceof Error)
                                    res.status(400).send({ error: 'Incorrect information. Blockchain error occured' })
                                else {
                                    const salt = randomGen()

                                    var new_token = new Token({
                                        token: salt,
                                        type: 'Transfer',
                                        artwork: result.artwork,
                                        agency: result.agency,
                                        buyer: result.buyer,
                                        owner: artwork.owner.email,
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
                                                        receiverEmail: artwork.owner.email,
                                                        receiverName: artwork.owner.name,
                                                        mailType: 'ConsentTransfer',
                                                        agency: agency.name,
                                                        artwork: artwork.title,
                                                        price: result.price,
                                                        link: `${host}/user/transferOwnership/${salt}`
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
        }
    })
}


exports.transferOwnership = function (req, res) {
    const token = req.params.token
    Token.findOne({ token: token }, function (err, result) {
        if (err)
            res.send(err)
        else if (result.expired)
            res.status(404).send({ error: 'Invalid token' })
        else {

            const artworkHandlerInstance = new artworkHandler(result.owner + '@artbook')
            artworkHandlerInstance.transferOwnership({
                artworkId: result.artwork,
                agencyId: result.agency,
                buyerId: result.buyer,
                price: result.price
            }).then(function (done) {
                if (done instanceof Error)
                    res.status(400).send({ error: 'Incorrect information. Blockchain error occured' })
                else {
                    result.update({ expired: true }, function (err, finished) {
                        if (err)
                            res.send(err)
                        else
                            res.json('Successful')
                    })
                }
            })

        }
    })
}
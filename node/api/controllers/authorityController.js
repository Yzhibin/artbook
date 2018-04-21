'use strict'
var bcrypt = require('bcrypt')
var authorityHandler = require('../../chainConnector/authorityHandler')
var mongoose = require('mongoose'),
    Authority = mongoose.model('Authority');

/**
 * 
 * userInfo:
 * account
 * name
 * password
 */
exports.createBranch = function (req, res) {
    var userInfo = req.body
    var userOnChain = {
        userId: userInfo.account,
        name: userInfo.name,
        address: userInfo.address
    }
    var userOffChain = {
        id: userInfo.account
    }

    bcrypt.genSaltS(function (err, salt) {
        if (err) {
            console.log('bcrypt.genSalt ERR')
        }
        userOffChain.salt = salt
        bcrypt.hash(userInfo.password + salt, 10, function (err, hashed) {
            if (err) {
                console.log('bcrypt.hash ERR')
            }
            userOffChain.password = hashed

            // Chain
            var adminHandlesNewUser = new authorityHandler('admin@artbook')
            adminHandlesNewUser.createBranch(userOnChain).then(
                function (result) {
                    if (result instanceof Error)
                        res.status(400).send({ error: 'Incorrect information. Blockchain error occured' })
                    else {
                        var new_user = new Authority(userOffChain)
                        new_user.save(function (err, user) {
                            if (err)
                                res.send(err);
                            else
                                res.json({ account: userInfo.account });
                        })
                    }
                })
        })
    })
};

exports.createPolice = function (req, res) {
    var userInfo = req.body
    var userOnChain = {
        userId: userInfo.account,
        name: userInfo.name,
        jurisdiction: userInfo.jurisdiction
    }
    var userOffChain = {
        id: userInfo.account
    }

    bcrypt.genSalt(function (err, salt) {
        if (err) {
            console.log('bcrypt.genSalt ERR')
        }
        userOffChain.salt = salt
        bcrypt.hash(userInfo.password + salt, 10, function (err, hashed) {
            if (err) {
                console.log('bcrypt.hash ERR')
            }
            userOffChain.password = hashed

            // Chain
            var adminHandlesNewUser = new authorityHandler('admin@artbook')
            adminHandlesNewUser.createPolice(userOnChain).then(
                function (result) {
                    if (result instanceof Error)
                        res.status(400).send({ error: 'Incorrect information. Blockchain error occured' })
                    else {
                        var new_user = new Authority(userOffChain)
                        new_user.save(function (err, user) {
                            if (err)
                                res.send(err);
                            else
                                res.json({ account: userInfo.account });
                        })
                    }
                })
        })
    })
};

exports.login = function (req, res) {

    var handlerInstance = new authorityHandler(req.body.account + '@artbook')
    var account = req.body.account
    console.log(account)

    if (account.charAt(0) == "0") {
        handlerInstance.getBranch(account).then(
            function (user) {
                if (user instanceof Error)
                    res.status(400).send({ error: 'Incorrect information. Blockchain error occured' })
                else
                    res.json(user)
            }
        )
    } else {
        handlerInstance.getPolice(account).then(
            function (user) {
                if (user instanceof Error)
                    res.status(400).send({ error: 'Incorrect information. Blockchain error occured' })
                else
                    res.json(user)
            }
        )
    }
};
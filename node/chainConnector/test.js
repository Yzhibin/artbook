var userHandler = require('./userHandler')

var adminConnection = new userHandler('admin@artbook')

var userInfo = {
    email: 'zhibinyu97@gmail.com',
    name: 'Zhibin Yu'
}

adminConnection.createUser(userInfo)
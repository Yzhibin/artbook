const mailer = require('./mailer')

mailer.sendMail({
    receiverEmail: 'zhibinyu97@gmail.com',
    receiverName: 'Zhibin',
    mailType: 'ConsentForSale',
    agency:`Sotheby's`,
    artwork:'Sunflower',
    otp: 's8gv1kj2'
})
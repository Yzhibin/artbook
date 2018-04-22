'use strict'
var axios = require('axios'),
    qs = require('querystring')
const host = 'http://52.187.128.189:3001'

const signupInstance = axios.create({
    baseURL: host,
    timeout: 10000,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
});

// Authority - Artbook branch
signupInstance.post('/branch', qs.stringify({
    account: '001',
    password: '123',
    name: 'Artbook HQ',
    address: 'Singapore'
})
).then(res => {
    console.log('Branch registered')
    console.log(res.data)
}).catch(error => {
    console.log(error);
});

// Authority - Police
signupInstance.post('/police', qs.stringify({
    account: '100',
    password: '123',
    name: 'InterPol Art Crime Division',
    jurisdiction: 'Worldwide'
})
).then(res => {
    console.log('Pilice registered')
    console.log(res.data)
}).catch(error => {
    console.log(error);
});

// Gallery
signupInstance.post('/agency', qs.stringify({
    email: 'gallery@example.com',
    password: '123',
    name: 'Lukisan Art Gellery'
})
).then(res => {
    console.log('Gallery registered')
    console.log(res.data)
}).catch(error => {
    console.log(error);
});

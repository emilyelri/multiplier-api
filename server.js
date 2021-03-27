// MODULE IMPORTS
const express = require('express');

// IMPORT ROUTER
const router = require('./router.js')

// INIT EXPRESS SERVER
const server = express();

// USE MIDDLEWARE_
server.use(express.json());

// CONNECT ROUTERS
server.use('/api/', router);

// TEST THAT API IS UP AT BASE URL '/'
server.get('/', (req, res) => {
    res.send({ api: 'up' })
})

// EXPORT SERVER TO INDEX.JS
module.exports = server;
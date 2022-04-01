const express = require('express');
const mysql      = require('mysql');


const routes = require('./routes')
const config = require('./config.json')

const app = express();

// Route 1 - register as GET 
app.get('/hello', routes.hello)

// Route 2 - register as GET 
app.get('/user/:choice', routes.user)





app.listen(config.server_port, () => {
    console.log(`Server running at http://${config.server_host}:${config.server_port}/`);
});

module.exports = app;

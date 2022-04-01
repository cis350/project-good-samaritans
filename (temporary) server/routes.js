const config = require('./config.json')
const mysql = require('mysql');
const e = require('express');

// TODO: fill in your connection details here
const connection = mysql.createConnection({
    host: config.rds_host,
    user: config.rds_user,
    password: config.rds_password,
    port: config.rds_port,
    database: config.rds_db
});
connection.connect();

// Route 1 (handler)
async function hello(req, res) {
    // a GET request to /hello?name=Steve
    if (req.query.name) {
        res.send(`Hello, ${req.query.name}! Welcome to the server!`)
    } else {
        res.send(`Hello! Welcome to the server!`)
    }
}

// Route 2 (handler)
async function user(req, res) {
    const param1 = req.params.choice ? req.params.choice : ''

    if (req.query.page && !isNaN(req.query.page)) {
        res.send(`error`)
    } else {
        // we have implemented this for you to see how to return results by querying the database
        connection.query(`SELECT *
        FROM Users
        WHERE name = '${param1}'`, function (error, results, fields) {

            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });
    }
}


module.exports = {
    hello,
    user
}
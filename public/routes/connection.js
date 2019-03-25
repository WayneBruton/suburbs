var express = require('express');
var router = express.Router();


const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    database: 'suburbs',
    password: '12071994W!',
    multipleStatements: true, //for more than one query in a get route
    debug: false
});

module.exports = pool;
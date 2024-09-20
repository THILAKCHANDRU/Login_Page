const mysql = require('mysql2')
require('dotenv').config();

const pool=mysql.createPool(
    {
        connectionLimit:10,
        host: 'localhost',
        user:'root',
        database:'login',
        password:process.env.DB_PASSWORD,
    }
)

module.exports = pool.promise();
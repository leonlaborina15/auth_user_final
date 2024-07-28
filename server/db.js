require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.USER,
    password: process.env.PASS,
    host: process.env.HOST,
    port: process.env.PORT,
    database: process.env.DBASE,
});

module.exports = pool;
//const { json } = require('body-parser');
const {createPool}= require ("mysql2");
require("dotenv").config();

const pool = createPool ({
    port:3306,
    host:'localhost',
    user:'root',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,

});

 module.exports=pool;
//const { json } = require('body-parser');
const {createPool}= require ("mysql2");
const pool = createPool ({
    port:3306,
    host:'localhost',
    user:'root',
    password:'',
    database:'buzzzdb'

});
// var pool = mysqlConnection.connect((err)=>
// {
//  if(err)
//         {
//             console.log('Error in Database Connnection :'+ JSON.stringify(err,undefined,2));
//         }
//         else
//         {
//             console.log('DataBase Connection Sucessfully')
//         }
// })
 module.exports=pool;

// const {createPool} = require("mysql");

// const pool = createPool ({
//     port:3306,
//     host:"localhost",
//     user : "root",
//     password:"",
//     database : "level_X"

// });

// module.exports = pool;
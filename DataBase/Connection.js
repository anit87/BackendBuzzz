//const { json } = require('body-parser');

const {createPool}= require ("mysql2");

// const mysql= require ("mysql2/promise");

require("dotenv").config();

const pool = createPool ({
  port:3306,
  host:'localhost',
  user:'root',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,

});
// const pool = createPool({
//   user: 'sql12717213',
//   host: 'sql12.freemysqlhosting.net',
//   database :'sql12717213',
//   password : 'pbsFeLtycj',
//   port:3306,
//   waitForConnections: true,
//   connectionLimit: 10,
//   maxIdle: 10,
//   idleTimeout: 60000,
//   queueLimit: 0,
//   enableKeepAlive: true,
//   keepAliveInitialDelay: 0,
// });



// const pool = createPool ({
//   user: 'sql12717213',
//   host: 'sql12.freemysqlhosting.net',
//   database :'sql12717213',
//   password : 'pbsFeLtycj',
//   port:3306,

// });


// const pool = createPool ({
//   //  name :'sql12716502',
//     user: 'root',
//     // host: 'localhost',
//     host: 'localhost',
//     database :'sql12717213',
//     //database: 'Buzz',
//     password : 'pbsFeLtycj',
//     port:3307,
  
//   });






// const pool = createPool({
//     user: 'sql12716502', // Replace with your actual username
//     host: 'sql12.freemysqlhosting.net',
//     database: 'sql12716502', // Replace with your database name
//     password: 'fPiKrzKudK', // Replace with your actual password
//     port: 3306, // Replace with your database port if different
// });



// const pool = createPool ({
//   port:3306,
//   Server: 'sql12.freemysqlhosting.net',
//   Name: 'sql12716502',
//   username:'sql12716502',
//   database: 'Buzzz',
//   password : ' fPiKrzKudK'

// });

// const { exec } = require('child_process');

// // Create the directory
// exec('mkdir -p %APPDATA%\\postgresql\\', (error, stdout, stderr) => {
//     if (error) {
//         console.error(`Error creating directory: ${error.message}`);
//         return;
//     }
//     if (stderr) {
//         console.error(`Standard error: ${stderr}`);
//         return;
//     }
//     console.log(`Directory created successfully: ${stdout}`);

//     // Download the certificate
//     //const downloadCommand = 'Invoke-WebRequest -Uri https://cockroachlabs.cloud/clusters/9e9aa39c-66bd-420e-a463-a24b8a77993f/cert -OutFile %APPDATA%\\postgresql\\root.crt';
    
//     // Execute the PowerShell command to download the file
//     exec(`powershell.exe "${downloadCommand}"`, (downloadError, downloadStdout, downloadStderr) => {
//         if (downloadError) {
//             console.error(`Error downloading certificate: ${downloadError.message}`);
//             return;
//         }
//         if (downloadStderr) {
//             console.error(`Standard error: ${downloadStderr}`);
//             return;
//         }
//         console.log(`Certificate downloaded successfully: ${downloadStdout}`);
//     });
// });

// pool.on('error', (err) => {
//     console.error('Database error:', err);
//     if (err.code === 'PROTOCOL_CONNECTION_LOST') {
//       console.error('Connection lost. Reconnecting...');
//       connection.connect();
//     } else {
//       throw err;
//     }
//   });

 module.exports=pool;

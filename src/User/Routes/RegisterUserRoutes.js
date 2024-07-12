const express = require('express');
const pool = require("../../../DataBase/Connection")

const router = express.Router();
const {
    SaveUpdateUserRouter,
    GetAllUserRouter,
    GetSingleUserRouter,
    DeleteUserRouter
} = require('../Controller/RegisterUser'); // Adjust the path as needed

// Route definitions
router.post('/', SaveUpdateUserRouter); // Handle POST requests to create or update user
 router.get('/', GetAllUserRouter); // Handle GET requests to fetch all users
router.get('/SingleUser/', GetSingleUserRouter); // Handle GET requests to fetch a single user
router.delete('/', DeleteUserRouter); // Handle DELETE requests to delete a user




// router.get('/',async (req,res)=>{

//     const [rows] = await pool.execute('SELECT * FROM employees');
//     res.json({rows})
// });








module.exports = router;

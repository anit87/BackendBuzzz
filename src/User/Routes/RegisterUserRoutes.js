const express = require('express');
const router = express.Router();
const {
    SaveUpdateUserRouter,
    GetAllUserRouter,
    GetSingleUserRouter,
    DeleteUserRouter
} = require('../Controller/RegisterUser'); // Adjust the path as needed

router.post('/', SaveUpdateUserRouter);
router.get('/', GetAllUserRouter);
router.get('/:id/:UserGuid', GetSingleUserRouter); // :id is a URL parameter
router.delete('/', DeleteUserRouter); // :id is a URL parameter

module.exports = router;

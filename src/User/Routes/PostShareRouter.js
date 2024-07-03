const express = require('express');
const router = express.Router();
const {
    SaveUpdatePostShareRouter,
    GetAllPostShareRouter,
    GetSinglePostShareRouter,
    DeletePostShareRouter
} = require('../Controller/PostShareController'); // Adjust the path as needed

router.post('/', SaveUpdatePostShareRouter);
router.get('/GetAllShare', GetAllPostShareRouter);
router.get('/',  GetSinglePostShareRouter); // :id is a URL parameter
router.delete('/', DeletePostShareRouter); // :id is a URL parameter

module.exports = router;
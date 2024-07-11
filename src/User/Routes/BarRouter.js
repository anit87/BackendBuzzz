const express = require('express');
const router = express.Router();
const {
    SaveUpdateBarRouter,
    GetAllBarRouter,
    GetSingleBarRouter,
    DeleteBarRouter
} = require('../Controller/BarController'); // Adjust the path as needed


router.post('/', SaveUpdateBarRouter);
router.get('/:UserId', GetAllBarRouter);
router.get('/',  GetSingleBarRouter); // :id is a URL parameter
router.delete('/', DeleteBarRouter); // :id is a URL parameter

module.exports = router;
const express = require('express');
const router = express.Router();
const {
    SaveUpdateProfilePostRouter,
    GetAllProfilePostRouter,
    GetSingleProfilePostRouter,
    DeleteProfilePostRouter
} = require('../Controller/ProfilePostController'); // Adjust the path as needed

router.post('/', SaveUpdateProfilePostRouter);
router.get('/:Id', GetAllProfilePostRouter);
router.get('/',  GetSingleProfilePostRouter); // :id is a URL parameter
router.delete('/', DeleteProfilePostRouter); // :id is a URL parameter

module.exports = router;
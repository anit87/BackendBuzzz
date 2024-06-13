const express = require('express');
const router = express.Router();
const {
    SaveUpdateCheckInRouter,
    GetAllCheckInRouter,
    GetSingleCheckInRouter,
    DeleteCheckInRouter
} = require('../Controller/CheckInController'); // Adjust the path as needed

router.post('/', SaveUpdateCheckInRouter);
router.get('/:UserId', GetAllCheckInRouter);
router.get('/',  GetSingleCheckInRouter); // :id is a URL parameter
router.delete('/', DeleteCheckInRouter); // :id is a URL parameter

module.exports = router;
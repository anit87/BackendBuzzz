const express = require('express');
const router = express.Router();
const {
    SaveUpdatePostLikeRouter,
    GetAllPostLikeRouter,
    GetSinglePostLikeRouter,
    DeletePostLikeRouter
} = require('../Controller/PostLikeController'); // Adjust the path as needed

router.post('/', SaveUpdatePostLikeRouter);
router.get('/:Id', GetAllPostLikeRouter);
router.get('/',  GetSinglePostLikeRouter); // :id is a URL parameter
router.delete('/', DeletePostLikeRouter); // :id is a URL parameter

module.exports = router;
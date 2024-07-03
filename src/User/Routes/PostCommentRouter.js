const express = require('express');
const router = express.Router();
const {
    SaveUpdatePostCommentRouter,
    GetAllPostCommentRouter,
    GetSinglePostCommentRouter,
    DeletePostCommentRouter
} = require('../Controller/PostCommentController'); // Adjust the path as needed

router.post('/', SaveUpdatePostCommentRouter);
router.get('/GetAllComment', GetAllPostCommentRouter);
router.get('/',  GetSinglePostCommentRouter); // :id is a URL parameter
router.delete('/', DeletePostCommentRouter); // :id is a URL parameter

module.exports = router;
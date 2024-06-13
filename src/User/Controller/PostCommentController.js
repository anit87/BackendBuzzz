const { SaveUpdatePostComment, GetAllPostComment, GetSinglePostComment, DeletePostComment } = require('../Service/PostCommentService');

const handleRequest = (handler) => async (req, res) => {
    try {
        await handler(req, res);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    SaveUpdatePostCommentRouter: handleRequest(async (req, res) => {
        console.log("C",req.body);
        const results = await SaveUpdatePostComment(req.body);
        res.json(results);
    }),

    GetAllPostCommentRouter: handleRequest(async (req, res) => {
        const UserId = req.param.userId;
        const results = await GetAllPostComment(UserId);
        res.json(results);
    }),

    GetSinglePostCommentRouter: handleRequest(async (req, res) => {
        const results = await GetSinglePostComment(req.body);
        
        res.json(results);
    }),

    DeletePostCommentRouter: handleRequest(async (req, res) => {
       
        const results = await DeletePostComment(req.body);
            res.json(results);
    })
}

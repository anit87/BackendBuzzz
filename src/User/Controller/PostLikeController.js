const { SaveUpdatePostLike, GetAllPostLike, GetSinglePostLike, DeletePostLike } = require('../Service/PostLikeService');

const handleRequest = (handler) => async (req, res) => {
    try {
        await handler(req, res);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    SaveUpdatePostLikeRouter: handleRequest(async (req, res) => {
        console.log("C",req.body);
        const results = await SaveUpdatePostLike(req.body);
        res.json(results);
    }),

    GetAllPostLikeRouter: handleRequest(async (req, res) => {
        const UserId = req.body;
        console.log("CPost",UserId)
        const results = await GetAllPostLike(UserId);
        res.json(results);
    }),

    GetSinglePostLikeRouter: handleRequest(async (req, res) => {
        const results = await GetSinglePostLike(req.body);
        
        res.json(results);
    }),

    DeletePostLikeRouter: handleRequest(async (req, res) => {
       
        const results = await DeletePostLike(req.body);
            res.json(results);
    })
}

const { SaveUpdatePostShare, GetAllPostShare, GetSinglePostShare, DeletePostShare } = require('../Service/PostShareService');

// Helper function to handle requests and catch errors
const handleRequest = (handler) => async (req, res) => {
    try {
        await handler(req, res);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Exported router handlers
module.exports = {
    SaveUpdatePostShareRouter: handleRequest(async (req, res) => {
        console.log("C", req.body);
        const results = await SaveUpdatePostShare(req.body);
        res.status(200).json(results);
    }),

    GetAllPostShareRouter: handleRequest(async (req, res) => {
        const  UserId  = req.body;
        console.log("CPost", UserId);
        const results = await GetAllPostShare(UserId);
        res.status(200).json(results);
    }),

    GetSinglePostShareRouter: handleRequest(async (req, res) => {
        const  id  = req.body; // assuming `id` is the identifier for a single post
        console.log("Get Single Post Share", id);
        const results = await GetSinglePostShare(id);
        res.status(200).json(results);
    }),

    DeletePostShareRouter: handleRequest(async (req, res) => {
        const id  = req.body; // assuming `id` is the identifier for deletion
        console.log("Delete Post Share", id);
        const results = await DeletePostShare(id);
        res.status(200).json(results);
    })
};


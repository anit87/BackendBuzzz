const { SaveUpdateProfilePost, GetAllProfilePost, GetSingleProfilePost, DeleteProfilePost } = require('../Service/ProfilePostService');

const handleRequest = (handler) => async (req, res) => {
    try {
        await handler(req, res);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    SaveUpdateProfilePostRouter: handleRequest(async (req, res) => {
        console.log("C",req.body);
        const results = await SaveUpdateProfilePost(req.body);
        res.json(results);
    }),

    GetAllProfilePostRouter: handleRequest(async (req, res) => {
       // const UserId = req.param.userId;
        const results = await GetAllProfilePost(req.body);
        res.json(results);
    }),

    GetSingleProfilePostRouter: handleRequest(async (req, res) => {
        const results = await GetSingleProfilePost(req.body);
        
        res.json(results);
    }),

    DeleteProfilePostRouter: handleRequest(async (req, res) => {
       
        const results = await DeleteProfilePost(req.body);
            res.json(results);
    })
}

const { SaveUpdateCheckIn, GetAllCheckIn, GetSingleCheckIn, DeleteCheckIn } = require('../Service/CheckInService');

const handleRequest = (handler) => async (req, res) => {
    try {
        await handler(req, res);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    SaveUpdateCheckInRouter: handleRequest(async (req, res) => {
        console.log("Save/Update CheckIn request body:", req.body);
        const results = await SaveUpdateCheckIn(req.body);
        res.json(results);
    }),

    GetAllCheckInRouter: handleRequest(async (req, res) => {
        const  UserId  = req.body;
        console.log("GetAllCheckIn request for UserId:", UserId);
        const results = await GetAllCheckIn(UserId);
        res.json(results);
    }),

    GetSingleCheckInRouter: handleRequest(async (req, res) => {
        console.log("GetSingleCheckIn request body:", req.body);
        const results = await GetSingleCheckIn(req.body);
        res.json(results);
    }),

    DeleteCheckInRouter: handleRequest(async (req, res) => {
        console.log("DeleteCheckIn request body:", req.body);
        const results = await DeleteCheckIn(req.body);
        res.json(results);
    })
};

const { SaveUpdateUser, GetAllUser, GetSingleUser, DeleteUser } = require('../Service/RegisterUserService');
const authenticateToken = require('../../../authMiddleware');

const handleRequest = (handler) => async (req, res) => {
    try {
        await handler(req, res);
    } catch (error) {
        console.error("Error in handler:", error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    SaveUpdateUserRouter: [
      //  authenticateToken,
        handleRequest(async (req, res) => {
            const results = await SaveUpdateUser(req.body);
            res.json(results);
        })
    ],

    GetAllUserRouter: [
       // authenticateToken,
        handleRequest(async (req, res) => {
            const results = await GetAllUser();
            res.json(results);
        })
    ],

    GetSingleUserRouter: [
      
        handleRequest(async (req, res) => {
            const results = await GetSingleUser(req.body);
            res.json(results);
        })
    ],

    DeleteUserRouter: [
      
        handleRequest(async (req, res) => {
            const results = await DeleteUser(req.body);
            res.json(results);
        })
    ]
};

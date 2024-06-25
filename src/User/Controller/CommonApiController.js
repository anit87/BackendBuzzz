const { 
    GetUserType, 
    GetGender, 
    GetAddressType, 
    GetDays, 
    GetStatus, 
    GetAccountType 
} = require('../Service/CommonApiService');
const handleRequest = (handler) => async (req, res) => {
    try {
        await handler(req, res);
    } catch (error) {
        console.error("Error:", error);  
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    GetUserTypeRouter: handleRequest(async (req, res) => {
        GetUserType(null, (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json(results);
        });
    }),

    GetGenderRouter: handleRequest(async (req, res) => {
        GetGender((err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json(results);
        });
    }),

    GetAddressTypeRouter: handleRequest(async (req, res) => {
        GetAddressType((err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json(results);
        });
    }),

    GetDaysRouter: handleRequest(async (req, res) => {
        GetDays((err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json(results);
        });
    }),

    GetStatusRouter: handleRequest(async (req, res) => {
        GetStatus((err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json(results);
        });
    }),

    GetAccountTypeRouter: handleRequest(async (req, res) => {
        GetAccountType((err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json(results);
        });
    })
};

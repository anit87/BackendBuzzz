const { 
    GetUserTypeRouter, 
    GetGenderRouter, 
    GetAddressTypeRouter, 
    GetDaysRouter, 
    GetStatusRouter, 
    //GetAccountTypeRouter 
} = require('../Controller/CommonApiController');

const router = require("express").Router();

// Define routes
router.get('/', GetUserTypeRouter);
router.get('/gender', GetGenderRouter);
router.get('/addressType', GetAddressTypeRouter);
router.get('/days', GetDaysRouter);  
router.get('/status', GetStatusRouter);
//router.get('/accountType', GetAccountTypeRouter);

module.exports = router;
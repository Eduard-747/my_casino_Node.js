// Standart requires
const router = require("express").Router();

// Local requires
const CasinoService = require('../services/casinoService');
const UserService = require("../services/userService");

router.post('/SPIN', (async (req, res) => {
   try { 
        let userBody =  (await UserService.getUser(req.body));
        let Casino = new CasinoService(userBody.amount, req.query.BET);
        let result = await Casino.SPIN();
        UserService.modifyUserAmount(req.body, Casino.client_balance);
        return res.send(result);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}));

module.exports = router;
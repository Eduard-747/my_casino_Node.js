
// Standart requires
const router = require("express").Router();

// Library requires

// Local requires
const CasinoService = require('../services/casinoService');
const UserService = require("../services/userService");
const ErrorHandler = require('../util/Utils').getMiddleware();

router.post('/SPIN',  ErrorHandler(async (req, res) => {
   try { 
        let userBody =  (await UserService.login(req.body.email, req.body.password));
        let Casino = new CasinoService(userBody.Amount, req.query.BET);
        let result = await Casino.SPIN();
        UserService.ChangeAmount(req.body.email, req.body.password, Casino.client_balance);
        return res.status(200).send(result);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}));

module.exports = router;
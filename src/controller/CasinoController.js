
// Standart requires
const router = require("express").Router();
const StatusCode = require('http-status-codes').StatusCodes;

// Library requires

// Local requires
const CasinoService = require('../services/casinoService');
const UserService = require("../services/userService");
const ErrorHandler = require('../util/Utils').getMiddleware();
const { validate } = require('../validation/Validation');
const casinoValidation = require('../validation/CasinoValidation');

router.post('/SPIN',  ErrorHandler(async (req, res) => {
   try { 
        const body = await validate(req.body, casinoValidation.SPIN);
        const { Email, Password, BET } = body;
        let { Amount } =  await UserService.login(Email, Password);
        let Casino = new CasinoService(Amount, BET);
        let result = await Casino.SPIN();
        UserService.ChangeAmount(Email, Password, Casino.client_balance);
        return res.status(StatusCode.OK).send(result);
    } catch (error) {
        return res.status(StatusCode.BAD_REQUEST).json(error.message);
    }
}));

module.exports = router;
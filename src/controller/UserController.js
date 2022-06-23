
// Standart requires
const router = require('express').Router();
const StatusCode = require('http-status-codes').StatusCodes;

// Library requires

// Local requires
const UserService = require('../services/userService');
const ErrorHandler = require('../util/Utils').getMiddleware();
const Response = require('../util/Response');
const { validate } = require('../validation/Validation');
const userValidation = require('../validation/UserValidation');

router.post('/CreateUser', ErrorHandler( async (req, res) => {
    try {
        const body = await validate(req.body, userValidation.CreateUser);
        const r = await UserService.create(body);
        return res.status(StatusCode.OK).json(new Response(r));
    } catch (err) {
        return res.status(err.cause ? err.cause.StatusCode : StatusCode.BAD_REQUEST).json(new Response({}, err));
    }
}));

router.delete('/DeleteUser', ErrorHandler(async (req, res) => {
    try {
        const query = await validate(req.query, userValidation.DeleteUser);
        const { Email, Password } = query;
        const r = await UserService.delete(Email, Password)
        return res.status(StatusCode.OK).json(new Response(r));
    } catch (err) {
        return res.status(err.cause ? err.cause.StatusCode : StatusCode.BAD_REQUEST).json(new Response({}, err));
    }
}));

router.put('/ChangePassword', ErrorHandler(async (req, res) => {
    try {
        const body = await validate(req.body, userValidation.ChangePassword);
        const { Email, Password, newPassword } = body;
        const r = await UserService.ChangePassword(Email, Password, newPassword);
        return res.status(StatusCode.OK).json(new Response(r));
    } catch (err) {
        return res.status(err.cause ? err.cause.StatusCode : StatusCode.BAD_REQUEST).json(new Response({}, err));
    }   
}));

router.put('/ChangeName', ErrorHandler(async (req, res) => {
    try {
        const body = await validate(req.body, userValidation.ChangeName);
        const { Email, Password, Name } = body;
        const r = await UserService.ChangeName(Email, Password, Name)
        return res.status(StatusCode.OK).json(new Response(r));
    } catch (err) {
        return res.status(err.cause ? err.cause.StatusCode : StatusCode.BAD_REQUEST).json(new Response({}, err));
    }
}));

router.get('/login', ErrorHandler(async (req, res) => {
    try {
        const query = await validate(req.query, userValidation.login);
        const { Email, Password } = query;
        const r = await UserService.login(Email, Password);
        return res.status(StatusCode.OK).json(new Response(r));
    } catch (err) {
        return res.status(err.cause ? err.cause.StatusCode : StatusCode.BAD_REQUEST).json(new Response({}, err));
    }
}));

module.exports = router;

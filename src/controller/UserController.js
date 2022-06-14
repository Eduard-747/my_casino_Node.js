
// Standart requires
const router = require('express').Router();
const StatusCode = require('http-status-codes').StatusCodes;

// Library requires

// Local requires
const UserService = require('../services/userService');
const ErrorHandler = require('../util/Utils').getMiddleware();
const Response = require('../util/Response');

router.post('/CreateUser', ErrorHandler( async (req, res) => {
    try {
        const r = await UserService.create(req.body);
        return res.status(StatusCode.OK).json(new Response(r));
    } catch (err) {
        return res.status(err.cause ? err.cause.StatusCode : StatusCode.BAD_REQUEST).json(new Response({}, err));
    }
}));

router.delete('/DeleteUser', ErrorHandler(async (req, res) => {
    try {
        const r = await UserService.delete(req.query.email, req.query.password)
        return res.status(StatusCode.OK).json(new Response(r));
    } catch (err) {
        return res.status(err.cause ? err.cause.StatusCode : StatusCode.BAD_REQUEST).json(new Response({}, err));
    }
}));

router.put('/ChangePassword', ErrorHandler(async (req, res) => {
    try {
        const r = await UserService.ChangePassword(req.body.email, req.body.password, req.body.newPassword);
        return res.status(StatusCode.OK).json(new Response(r));
    } catch (err) {
        return res.status(err.cause ? err.cause.StatusCode : StatusCode.BAD_REQUEST).json(new Response({}, err));
    }   
}));

router.put('/ChangeName', ErrorHandler(async (req, res) => {
    try {
        const r = await UserService.ChangeName(req.body.email, req.body.password, req.body.name)
        return res.status(StatusCode.OK).json(new Response(r));
    } catch (err) {
        return res.status(err.cause ? err.cause.StatusCode : StatusCode.BAD_REQUEST).json(new Response({}, err));
    }
}));

router.get('/login', ErrorHandler(async (req, res) => {
    try {
        const r = await UserService.login(req.query.email, req.query.password);
        return res.status(StatusCode.OK).json(new Response(r));
    } catch (err) {
        return res.status(err.cause ? err.cause.StatusCode : StatusCode.BAD_REQUEST).json(new Response({}, err));
    }
}));

module.exports = router;

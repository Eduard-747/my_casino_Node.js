
// Standart requires
const router = require('express').Router();

// Library requires

// Local requires
const UserService = require('../services/userService');
const ErrorHandler = require('../util/Utils').getMiddleware();

router.post('/CreateUser', ErrorHandler( async (req, res) => {
    try {
        return res.status(200).json(await UserService.create(req.body));
    } catch (err) {
        return res.status(400).json(err);
    }
}));

router.delete('/DeleteUser', ErrorHandler(async (req, res) => {
    try {
        return res.status(200).json(await UserService.delete(req.query.email, req.query.password));
    } catch (err) {
        return res.status(400).json(err);
    }
}));

router.put('/ChangePassword', ErrorHandler(async (req, res) => {
    try {
        return res.status(200).json(await UserService.ChangePassword(req.body.email, req.body.password, req.body.newPassword));
    } catch (err) {
        return res.status(400).json(err);
    }   
}));

router.put('/ChangeName', ErrorHandler(async (req, res) => {
    try {
        return res.status(200).json(await UserService.ChangeName(req.body.email, req.body.password, req.body.name));
    } catch (err) {
        return res.status(400).json(err);
    }
}));

router.get('/login', ErrorHandler(async (req, res) => {
    try {
        return res.status(200).json(await UserService.login(req.query.email, req.query.password));
    } catch (err) {
        return res.status(400).json(err);
    }
}));

module.exports = router;

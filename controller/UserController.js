// Standart requires
const router = require("express").Router();

// Local requires
const UserService = require("../services/userService");

router.post("/createUser", (async (req, res) => {
    try {
        await UserService.insertUser(req.body);
        return res.status(200).json('Ok you insert user');
    } catch(error) {
        return res.status(400).json(error.message);
    }
}));

router.put("/changeName", (async (req, res) => {
    try {
        await UserService.modifyUserName(req.body);
        return res.status(200).json('Ok you modify user Name');
    } catch(error) {
        return res.status(400).json(error.message);
    }
}));

router.put("/changeAmount", (async (req, res) => {
    try {
        await UserService.modifyUserAmount(req.body, req.body.amount);
        return res.status(200).json('Ok you modify user Amount');
    } catch(error) {
        return res.status(400).json(error.message);
    }
}));

router.delete("/deleteUser", ( async (req,res) => {
    try {
        await UserService.deleteUser(req.query.id); 
        
        return res.status(200).json('Ok you delete user');
    } catch(error) {
        return res.status(400).json(error.message);
    }
}));

module.exports = router;
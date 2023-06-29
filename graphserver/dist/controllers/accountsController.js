"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require('bcryptjs');
const Model = require("../models/Schemas.js");
// simple function to create a encrypted password
async function hashPassword(password) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    }
    catch (err) {
        console.log(err);
        return "";
    }
}
// function to compare credentials to the database
// status code sent based on credability
exports.verify = async (req, res) => {
    const { username, password, email } = req.body;
    if (!password || !username || !email) {
        return res.status(400).send("invalid request");
        //return;
    }
    try {
        const docs = await Model.accountModel.find({ email: email });
        if (docs.length < 1) {
            res.json({
                success: false,
                errmsg: "email not registered"
            });
            return;
        }
        const isMatch = await bcrypt.compare(password, docs[0].password);
        if (isMatch && docs[0].username === username) {
            console.log("is a match");
            res.status(200).json({
                success: true,
                id: docs[0]._id
            });
        }
        else {
            console.log("is NOT a match");
            res.sendStatus(401);
        }
    }
    catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
};
// create a new account and send to database
exports.create = async (req, res) => {
    // grab username, password, and email from request
    const { username, password, email } = req.body;
    if (!password || !username || !email) {
        res.status(400).send("invalid request");
        return;
    }
    const docs = await Model.accountModel.find({ email: email });
    // check if email is already registered
    if (docs.length > 0) {
        res.status(401).send("email already registered");
        return;
    }
    let newAccount = new Model.accountModel({
        username: username,
        password: await hashPassword(password),
        email: email
    });
    newAccount.save();
    res.sendStatus(201);
};
//# sourceMappingURL=accountsController.js.map
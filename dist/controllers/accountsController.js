"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require('bcryptjs');
const accountModel = require("../models/Schemas.js");
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
    try {
        const docs = await accountModel.find({ email: email });
        if (docs.length < 1) {
            res.send("email not registered");
            return;
        }
        const isMatch = await bcrypt.compare(password, docs[0].password);
        if (isMatch && docs[0].username === username) {
            console.log("is a match");
            res.sendStatus(200);
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
    const { username, password, email } = req.body;
    let newAccount = new accountModel({
        username: username,
        password: await hashPassword(password),
        email: email
    });
    newAccount.save();
    res.sendStatus(201);
};
//# sourceMappingURL=accountsController.js.map
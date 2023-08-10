var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { default as bcrypt } from 'bcryptjs';
import { accountModel } from "../models/Schemas.js";
import { default as jwt } from "jsonwebtoken";
import { default as env } from "dotenv";
// simple function to create a encrypted password
function hashPassword(password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const salt = yield bcrypt.genSalt(10);
            const hashedPassword = yield bcrypt.hash(password, salt);
            return hashedPassword;
        }
        catch (err) {
            console.log(err);
            return "";
        }
    });
}
// function to compare credentials to the database
// status code sent based on credability
const verify = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    env.config();
    const { username, password, email } = req.body;
    if (!password || !username || !email) {
        return res.status(400).json({
            success: false,
            msg: "invalid request"
        });
    }
    try {
        const docs = yield accountModel.find({ email: email });
        if (docs.length < 1) {
            res.json({
                success: false,
                errmsg: "email not registered"
            });
            return;
        }
        // verify with bcrpyt that passwords match
        const isMatch = yield bcrypt.compare(password, docs[0].password);
        if (isMatch && docs[0].username === username) {
            const userData = {
                id: docs[0]._id,
                username,
                password,
                email
            };
            // create an access token
            const accessToken = jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET);
            res.status(200).json({
                success: true,
                token: accessToken,
                username: username,
                email: email,
                id: docs[0]._id,
            });
        }
        else {
            res.status(401).json({
                succes: false
            });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            success: false
        });
    }
});
// create a new account and send to database
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // grab username, password, and email from request
    const { username, password, email } = req.body;
    if (!password || !username || !email) {
        res.status(400).json({
            success: false,
            msg: "invalid request"
        });
        return;
    }
    const docs = yield accountModel.find({ email: email });
    // check if email is already registered
    if (docs.length > 0) {
        res.status(401).json({
            success: false,
            msg: "email already registered"
        });
        return;
    }
    // schema: accountSchema
    let newAccount = new accountModel({
        username: username,
        password: yield hashPassword(password),
        email: email
    });
    newAccount.save();
    res.status(201).json({
        success: true,
        msg: "account saved!"
    });
});
// authentication using only a token
// this is allow the user to not have to login
const quickAuth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tokenID, tokenUsername, tokenEmail } = req.body;
        const docs = yield accountModel.findById(tokenID);
        if (docs) {
            return res.status(200).json({
                success: true,
                username: tokenUsername,
                email: tokenEmail,
                id: tokenID
            });
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            msg: err
        });
    }
});
export { verify, create, quickAuth };
//# sourceMappingURL=accountsController.js.map
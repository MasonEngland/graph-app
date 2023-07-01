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
        return res.status(400).send("invalid request");
        //return;
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
        const isMatch = yield bcrypt.compare(password, docs[0].password);
        if (isMatch && docs[0].username === username) {
            console.log("is a match");
            const userData = {
                id: docs[0]._id
            };
            const accessToken = jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET);
            res.status(200).json({
                success: true,
                token: accessToken,
                username: username
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
});
// create a new account and send to database
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // grab username, password, and email from request
    const { username, password, email } = req.body;
    if (!password || !username || !email) {
        res.status(400).send("invalid request");
        return;
    }
    const docs = yield accountModel.find({ email: email });
    // check if email is already registered
    if (docs.length > 0) {
        res.status(401).send("email already registered");
        return;
    }
    let newAccount = new accountModel({
        username: username,
        password: yield hashPassword(password),
        email: email
    });
    newAccount.save();
    res.sendStatus(201);
});
export { verify, create };
//# sourceMappingURL=accountsController.js.map
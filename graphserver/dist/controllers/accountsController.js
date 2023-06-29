"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = exports.verify = void 0;
const bcrypt = __importStar(require("bcryptjs"));
const Schemas_1 = require("../models/Schemas");
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
    const { username, password, email } = req.body;
    if (!password || !username || !email) {
        return res.status(400).send("invalid request");
        //return;
    }
    try {
        const docs = yield Schemas_1.accountModel.find({ email: email });
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
});
exports.verify = verify;
// create a new account and send to database
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // grab username, password, and email from request
    const { username, password, email } = req.body;
    if (!password || !username || !email) {
        res.status(400).send("invalid request");
        return;
    }
    const docs = yield Schemas_1.accountModel.find({ email: email });
    // check if email is already registered
    if (docs.length > 0) {
        res.status(401).send("email already registered");
        return;
    }
    let newAccount = new Schemas_1.accountModel({
        username: username,
        password: yield hashPassword(password),
        email: email
    });
    newAccount.save();
    res.sendStatus(201);
});
exports.create = create;
//# sourceMappingURL=accountsController.js.map
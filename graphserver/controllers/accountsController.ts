import {Request, Response} from 'express';
import {default as bcrypt} from 'bcryptjs';
import {accountModel} from "../models/Schemas.js";
import {default as jwt} from "jsonwebtoken";
import {default as env} from "dotenv";

// simple function to create a encrypted password
async function hashPassword(password: string): Promise<string> {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (err) {
        console.log(err);
        return "";
    }
}
// function to compare credentials to the database
// status code sent based on credability
const verify = async(req: Request, res:Response) => {
    env.config();
    const {username, password, email} = req.body;
    if (!password || !username || !email) {
        return res.status(400).send("invalid request");
    }
    try {
        const docs = await accountModel.find({email: email});
        if (docs.length < 1) {
            res.json({
                success: false,
                errmsg: "email not registered"
            });
            return;
        }
        // verify with bcrpyt that passwords match
        const isMatch = await bcrypt.compare(password, docs[0].password);

        if (isMatch && docs[0].username === username) {
            const userData = {
                id: docs[0]._id
            }
            // create an access token
            const accessToken = jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET)
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
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false
        });
    }
}
// create a new account and send to database
const create = async (req: Request, res:Response) => {
    // grab username, password, and email from request
    const {username, password, email} = req.body;
    if (!password || !username || !email) {
        res.status(400).send("invalid request");
        return;
    }
    const docs = await accountModel.find({email: email});
    // check if email is already registered
    if (docs.length > 0) {
        res.status(401).send("email already registered");
        return;
    }
    // schema: accountSchema
    let newAccount = new accountModel({
        username: username,
        password: await hashPassword(password),
        email: email
    })
    newAccount.save();
    res.sendStatus(201);
}

export { verify, create }
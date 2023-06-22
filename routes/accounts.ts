import {Request, Response, Next, Router} from 'express';
const router = Router();
const bcrypt = require('bcryptjs');
const accountModel = require("../models/Schemas.js");


// verification route for logging in 
router.post("/verify", (req: Request, res: Response) => {
    console.log("I got a request");
    const PASSWORD = req.body.password;
    const username = req.body.username;
    const accountEmail = req.body.email;
    // find document based on email
    accountModel.find({email: accountEmail})
        .then((docs) => {
            if (docs.length > 0) {
                console.log(docs);
                // compares the encrpyted stored password with the password given by the user
                bcrypt.compare(PASSWORD, docs[0].password, async(err: Error, isMatch) => {
                    if (err != null) {
                        console.log(err);
                        res.sendStatus(500);
                    }
                    else if (isMatch && username == docs[0].username) {
                        console.log("is a match");
                        res.sendStatus(200);
                    }
                    else {
                        console.log("is NOT a match");
                        res.sendStatus(401);
                    }
                })
            }
            else {
                res.send("email not registered")
            }
            // catch all errors
        }).catch((err) => {
            console.log(err);
            res.sendStatus(500);
        })
})

// creation route for creating an account
router.post("/create", async (req: Request, res: Response) => {
    const data = req.body;
    let hashedPassword: String;


    // generate a salt to add to the beggining of the password
    try {
        const salt = await bcrypt.genSalt(10);
        hashedPassword = await bcrypt.hash(data.password, salt);
        // create and save new document to the database
        const newAccount = new accountModel({
            username: data.username,
            password: hashedPassword,
            email: data.email
        })
        newAccount.save();
        // 200: okay
        res.sendStatus(201);
    } catch (err) {
        console.log(err)
        // 500: internal server error
        res.sendStatus(500);
    }
});
// export router for other modules
module.exports = router;
import {Request, Response, Router} from 'express';
const router = Router();
const bcrypt = require('bcryptjs');
const accountModel = require("../models/Schemas.js");


/**
 * verification route for logging in
 * I will complete this once the front end 
 * begins developement
 */
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
// export router for other modules
module.exports = router;
import {Request, Response, Router} from 'express';
const router = Router();
const accountModel = require("../models/Schemas.js");

router.get("/verify", (req: Request, res: Response) => {
    accountModel.find({username: "Mason", password: "test123"})
        .then((result) => {
            if (result.length < 1) {
                res.sendStatus(401);
            }
            else {
                res.sendStatus(200);
            }
        })
})

module.exports = router;
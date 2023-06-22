"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const accountModel = require("../models/Schemas.js");
router.get("/verify", (req, res) => {
    accountModel.find({ username: "Mason", password: "test123" })
        .then((result) => {
        if (result.length < 1) {
            res.sendStatus(401);
            return;
        }
        else {
            res.sendStatus(200);
        }
    });
});
module.exports = router;
//# sourceMappingURL=accounts.js.map
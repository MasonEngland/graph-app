"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const controller = require("../controllers/accountsController.js");
// verification route for logging in and signing up
router.post("/verify", controller.verify);
router.post("/create", controller.create);
//export router to the server
module.exports = router;
//# sourceMappingURL=accounts.js.map
import { Router } from 'express';
const router = Router();
const controller = require("../controllers/accountsController.js");


// verification route for logging in and signing up
router.post("/verify", controller.verify);
router.post("/create", controller.create);

//export router to the server
module.exports = router;

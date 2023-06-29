import { Router } from 'express';
import * as controller from "../controllers/accountsController";
const router = Router();


// verification route for logging in and signing up
router.post("/verify", controller.verify);
router.post("/create", controller.create);

//export router to the server
module.exports = router;

import { Router } from 'express';
import * as controller from "../controllers/accountsController.js";
import authenticateToken from '../middleware/auth.js';
const router = Router();


// verification route for logging in and signing up
router.post("/verify", controller.verify);
router.post("/create", controller.create);
router.get("/quickauth", authenticateToken, controller.quickAuth);

//export router to the server
export {router};

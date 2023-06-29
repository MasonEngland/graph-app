import {Router} from 'express';
import * as controller from "../controllers/graphsController.js";
import authenticateToken from '../middleware/auth.js';
const router = Router();

// all routes for /graphs
router.post("/:type", authenticateToken, controller.regGraph);
router.get("/:id", authenticateToken, controller.getGraphs);
router.delete("/:type/:id",authenticateToken, controller.deleteGraph);


export {router};
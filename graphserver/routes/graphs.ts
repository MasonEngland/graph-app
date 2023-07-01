import {Router} from 'express';
import * as controller from "../controllers/graphsController.js";
import authenticateToken from '../middleware/auth.js';
const router = Router();

// all CRUD operation routes for /graphs
router.post("/:type", authenticateToken, controller.regGraph);
router.get("/:id", authenticateToken, controller.getGraphs);
router.delete("/:id",authenticateToken, controller.deleteGraph);
router.patch("/:id", authenticateToken, controller.editGraph);

export {router};
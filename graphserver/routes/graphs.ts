import {Router} from 'express';
import * as controller from "../controllers/graphsController";
const router = Router();

// all routes for /graphs
router.post("/:type", controller.regGraph);
router.get("/:id", controller.getGraphs);
router.delete("/:type/:id", controller.deleteGraph);

module.exports = router;
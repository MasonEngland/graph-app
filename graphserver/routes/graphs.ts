import {Router} from 'express';
const router = Router();
const controller = require("../controllers/graphsController.js");

// all routes for /graphs
router.post("/:type", controller.regGraph);
router.get("/:id", controller.getGraphs);
router.delete("/:type/:id", controller.deleteGraph);

module.exports = router;
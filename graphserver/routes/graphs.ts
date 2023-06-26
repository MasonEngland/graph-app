import {Request, Response, Router} from 'express';
const router = Router();
const controller = require("../controllers/graphsController.js");

// all routes for /graphs
router.post("/:type", controller.registerGraph);
router.get("/:id", controller.getGraphs);

module.exports = router;
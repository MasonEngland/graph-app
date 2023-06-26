import {Request, Response, Router} from 'express';
const router = Router();
const controller = require("../controllers/graphsController.js");

router.post("/:type", controller.registerGraph);
router.get("/:id", controller.getGraphs);

module.exports = router;
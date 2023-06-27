import {Request, Response, Router} from 'express';
const router = Router();
const controller = require("../controllers/graphsController.js");

// all routes for /graphs
router.post("/vendiagram", controller.regVendiagram);
router.get("/:id", controller.getGraphs);

module.exports = router;
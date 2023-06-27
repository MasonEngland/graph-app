"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const controller = require("../controllers/graphsController.js");
// all routes for /graphs
router.post("/vendiagram", controller.regVendiagram);
router.post("/linegraph", controller.regLineGraph);
router.get("/:id", controller.getGraphs);
module.exports = router;
//# sourceMappingURL=graphs.js.map
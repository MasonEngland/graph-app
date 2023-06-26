"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const controller = require("../controllers/graphsController.js");
router.post("/:type", controller.registerGraph);
router.get("/:id", controller.getGraphs);
module.exports = router;
//# sourceMappingURL=graphs.js.map
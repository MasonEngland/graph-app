import { Router } from 'express';
import * as controller from "../controllers/graphsController.js";
import authenticateToken from '../middleware/auth.js';
import validateID from '../middleware/validateID.js';
const router = Router();
// all CRUD operation routes for /graphs
router.post("/:type", authenticateToken, controller.regGraph);
router.get("/:id", authenticateToken, controller.getGraphs);
router.delete("/:id", authenticateToken, validateID, controller.deleteGraph);
router.patch("/:id", authenticateToken, validateID, controller.editGraph);
export { router };
//# sourceMappingURL=graphs.js.map
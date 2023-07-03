import { Router } from 'express';
import * as controller from "../controllers/graphsController.js";
import authenticateToken from '../middleware/auth.js';
import validateID from '../middleware/validateID.js';
import matchToken from '../middleware/matchToken.js';
const router = Router();
router.use(authenticateToken);
// all CRUD operation routes for /graphs
router.post("/:type", controller.regGraph);
router.get("/:id", matchToken, controller.getGraphs);
router.delete("/:id", validateID, controller.deleteGraph);
router.patch("/:id", validateID, controller.editGraph);
export { router };
//# sourceMappingURL=graphs.js.map
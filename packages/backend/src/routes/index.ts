import { Router } from "express";

import ClassesController from "../controller/ClassesController";
import ConnectionsController from "../controller/ConnectionsController";

const router = Router();

router.get("/classes", ClassesController.index);
router.post("/classes", ClassesController.create);

router.get("/connections", ConnectionsController.index);
router.post("/connections", ConnectionsController.create);

export default router;

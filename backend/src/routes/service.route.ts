import express from "express";
import { USER_ROLE } from "@prisma/client";
import checkJwt from "../middleware/auth";
import { requireRole } from "../middleware/checkRole";
import {
  getServices,
  createService,
  updateService,
  deleteService,
} from "../controllers/service.controller";

const router = express.Router();

router.get("/", getServices); // Public
router.post("/", checkJwt, requireRole(USER_ROLE.ADMIN), createService);
router.put("/:id", checkJwt, requireRole(USER_ROLE.ADMIN), updateService);
router.delete("/:id", checkJwt, requireRole(USER_ROLE.ADMIN), deleteService);

export default router;

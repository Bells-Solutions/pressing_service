import express from "express";
import checkJwt from "../middleware/auth";
import { requireRole } from "../middleware/checkRole";
import { USER_ROLE } from "@prisma/client";
import {
  assignDeliveryPerson,
  getAssignedOrders,
} from "../controllers/assign.controller";

const router = express.Router();

router.patch(
  "/:id/assign",
  checkJwt,
  requireRole(USER_ROLE.ADMIN),
  assignDeliveryPerson
);

router.get(
  "/assigned",
  checkJwt,
  requireRole(USER_ROLE.DELIVERY),
  getAssignedOrders
);

export default router;

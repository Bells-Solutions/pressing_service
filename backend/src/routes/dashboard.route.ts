import checkJwt from "../middleware/auth";
import { requireRole } from "../middleware/checkRole";
import express from "express";
import { USER_ROLE } from "@prisma/client";
import { getDashboardStats } from "../controllers/dashboard.controller";

const router = express.Router();

router.get(
  "/dashboard/stats",
  checkJwt,
  requireRole(USER_ROLE.ADMIN),
  getDashboardStats
);

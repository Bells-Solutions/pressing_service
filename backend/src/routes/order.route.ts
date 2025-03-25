import { Router } from "express";
import { USER_ROLE } from "@prisma/client";
import {
  getAllOrders,
  getMyOrders,
  createOrder,
  updateOrderStatus,
  deleteOrder,
  getMyOrderById,
  reOrder,
  cancelMyOrder,
  getMyOrdersWithFilters,
} from "../controllers/orders.controller";
import checkJwt from "../middleware/auth";
import { requireRole } from "../middleware/checkRole";

const router = Router();

router.get("/", checkJwt, requireRole(USER_ROLE.ADMIN), getAllOrders);
router.get("/my-orders", checkJwt, getMyOrders);
router.get("/my-orders/history", checkJwt, getMyOrdersWithFilters);
router.get("/:id", checkJwt, getMyOrderById);
router.post("/", checkJwt, createOrder);
router.post("/:id/reorder", checkJwt, reOrder);
router.put("/:id", requireRole(USER_ROLE.ADMIN), checkJwt, updateOrderStatus);
router.delete("/:id", checkJwt, requireRole(USER_ROLE.ADMIN), deleteOrder);
router.patch("/:id/cancel", checkJwt, cancelMyOrder);

export default router;

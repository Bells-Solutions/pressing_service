import express from "express";
import { syncAuth0User } from "../controllers/auth.controller";
const router = express.Router();

router.post("/sync", syncAuth0User);

export default router;

import express from "express";
import { syncAuth0User } from "../controllers/auth.controller";
import checkJwt from "../middleware/auth";
import { leaveFeedback } from "../controllers/leaveFeedback.controller";
const router = express.Router();

router.post("/:id/feedback", checkJwt, leaveFeedback);

export default router;

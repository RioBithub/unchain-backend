import { Router } from "express";
import dashboardHandler from "../handlers/dashboardHandler.js";
import { verifyToken } from "../utils/middleware/auth.js";

const router = Router();

router.use(verifyToken);

// Endpoint untuk memproses dashboard
router.post("/dashboard", dashboardHandler.processDashboard);

// Endpoint untuk mengambil dashboard
router.get("/dashboard", dashboardHandler.getDashboard);

export default { router };

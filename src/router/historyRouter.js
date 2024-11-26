import { Router } from "express";
import historyHandler from "../handlers/historyHandler.js";
import { verifyToken } from "../utils/middleware/auth.js";

const router = Router();

router.use(verifyToken);

router.post('/histories', historyHandler.createHistory);
router.get('/histories', historyHandler.getHistoriesByUser);
router.put('/histories/:id', historyHandler.updateHistoryById);
router.delete('/histories/:id', historyHandler.deleteHistoryById);

export default { router };

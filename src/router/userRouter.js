import { Router } from "express";
import userHandler from "../handlers/userHandler.js";
import { verifyToken } from "../utils/middleware/auth.js";

const router = Router()

router.use(verifyToken);
router.post('/users', userHandler.createUser);
router.put('/users/profile', userHandler.updateUser);
router.get('/users/profile', userHandler.getProfile);
router.get('/users/sugar-level', userHandler.predictSugarLevelUser);
router.get('/users/behaviour', userHandler.predictBehaviourUser);

export default {router}
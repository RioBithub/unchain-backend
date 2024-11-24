import { Router } from "express";
import userHandler from "../handlers/userHandler.js";
import { verifyToken } from "../utils/middleware/auth.js";

const router = Router()

router.post('/users', userHandler.createUser);
router.put('/users/:id/token', userHandler.updateUserTokenById);

router.use(verifyToken);
router.get('/users/info', userHandler.getUserByToken);
router.put('/users', userHandler.updateUserByLoggedIn);

export default {router}
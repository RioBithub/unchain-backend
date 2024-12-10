import { Router } from "express";
import userHandler from "../handlers/userHandler.js";
import { verifyToken } from "../utils/middleware/auth.js";

const router = Router()

router.use(verifyToken);
router.post('/users', userHandler.createUser);
router.put('/users/:id', userHandler.updateUser);

export default {router}
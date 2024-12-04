import express from 'express';
import { getDashboard } from '../handlers/dashboardHandler.js';

const router = express.Router();

router.get('/dashboard', getDashboard);

export default { router };

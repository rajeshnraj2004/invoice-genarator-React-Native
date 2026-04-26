import express from 'express';
import User from '../models/User.js';
import { SignUp, SignIn } from '../controllers/authController.js';

const router = express.Router();

// --- Routes ---
router.post('/signup', SignUp);
router.post('/signin', SignIn);

export default router;
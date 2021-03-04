import express from 'express';
import { login, profile } from '../controller/routes.js';
import authenticate from '../middleware/auth.js';

const router = express.Router();

// Login endpoint
router.post('/login', login)

// Authenticated User
router.get('/profile', authenticate, profile)


export default router;
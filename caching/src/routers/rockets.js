import express from 'express';
import { fetchOneRocketController, fetchRocketsController } from '../controller/rockets.js';
import { singleCache, multipleCache } from '../middleware/cache.js';

const router = express.Router();

router.get('/rockets', multipleCache, fetchRocketsController)
router.get('/rockets/:id', singleCache, fetchOneRocketController)

export default router;
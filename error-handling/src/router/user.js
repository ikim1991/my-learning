import express from 'express';
import { getHome, getPokemons, setPokemon, userLogin, userLogout } from '../controller/user.js';
import authenticate from '../mw/auth.js';
import cache from '../mw/cache.js';

const router = express.Router();

router.post('/login', userLogin);
router.get('/', authenticate, getHome);
router.get('/pokemon', authenticate, cache, getPokemons);
router.post('/pokemon', authenticate, setPokemon);
router.post('/logout', authenticate, userLogout);

export default router;
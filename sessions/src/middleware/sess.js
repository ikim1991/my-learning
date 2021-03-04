import session from 'express-session';
import connectRedis from 'connect-redis';
import redisClient from '../database/redis.js';

const RedisStore = connectRedis(session);

// Configure Session Middleware
const sess = session({
    store: new RedisStore({client: redisClient}),
    secret: 'mySecret', // Use environment variable
    saveUninitialized: false,
    resave: false,
    name: 'sessionId',
    cookie: {
        secure: false, // Set to true in production. Transmit cookie over https
        httpOnly: true, // Prevents client side JS from reading the cookie
        maxAge: (1000 * 60 * 30) // Session max age in ms
    }
})

export default sess;
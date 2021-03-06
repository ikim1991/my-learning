import session from 'express-session';
import connectRedis from 'connect-redis';
import redisClient from '../db/redis.js';

// Configure Sessions Middleware
const RedisStore = connectRedis(session)
const sessions = session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    name: 'sessionID',
    cookie: {
        secure: false, // Set to true for production
        sameSite: true,
        httpOnly: true,
        maxAge: (1000 * 60 * 30)
    }
})

export default sessions;
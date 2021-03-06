import redis from 'redis';
import ApiError from '../error/ApiError.js';

// Configure Redis
const redisClient = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
})

redisClient.on('error', (err) => {
    console.error(`DB Error ${err.errno}: ${err.code}`)
})

export default redisClient;
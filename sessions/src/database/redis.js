import redis from 'redis';

// Configure Redis
const redisClient = redis.createClient({
    port: 6379,
    host: 'localhost'
})

export default redisClient;
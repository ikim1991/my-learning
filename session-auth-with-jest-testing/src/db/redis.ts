import redis from 'redis';
import redisConfig from '../config/redisConfig';

const redisClient = redis.createClient(redisConfig)

redisClient.on('error', (err: Error) => {
   console.error(`${err.name} - ${err.message}`)
})

export default redisClient;
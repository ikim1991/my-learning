import corsConfig from './corsConfig';
import mongooseConfig from './mongooseConfig';
import redisConfig from './redisConfig';
import sessionsConfig from './sesssionsConfig';

const config = {
   redis: redisConfig,
   sessions: sessionsConfig,
   mongoose: mongooseConfig,
   cors: corsConfig
}

export default config;
import { promisify } from 'util';
import redisClient from '../db/redis.js';

export const GET_ASYNC = promisify(redisClient.get).bind(redisClient)
export const SET_ASYNC = promisify(redisClient.set).bind(redisClient)
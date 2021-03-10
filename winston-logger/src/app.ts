import express from 'express';
import logger from './logger';

const app = express()

logger.info('text info', { meta: 1 })
logger.warn('warn info')
logger.error('error info')

export default app;
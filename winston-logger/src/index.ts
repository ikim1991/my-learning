import app from './app';
import logger from './logger';

app.listen(process.env.PORT, () => {
    logger.info(`Running on ${process.env.PORT}`)
})
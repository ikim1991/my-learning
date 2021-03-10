import { createLogger, format, transports} from 'winston';

function buildProdLogger(){
    const { colorize, timestamp, combine, printf, errors, json } = format

    const logFormat = printf(({ level, message, timestamp, stack }) => {
        return `${timestamp} ${level}: ${stack || message}`;
    })
    
    return createLogger({
        level: 'debug',
        format: combine(
            colorize(),
            timestamp({ format: 'YYYY-MM-DD HH:mm:ss'}),
            errors({stack: true}),
            json()
        ),
        defaultMeta: { service: 'user-service' },
        transports: [
            new transports.Console()
        ]
    })
}

export default buildProdLogger;
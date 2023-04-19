import winston from "winston";


const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console()
    ],
});

export default class Log {
    static info(message: string, ...meta: any[]) {
        logger.info(message, meta);
    }
}

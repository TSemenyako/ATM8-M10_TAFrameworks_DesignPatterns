const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    transports: [
        new winston.transports.Console({ level: 'info' }),
        new winston.transports.File({ filename: 'combined.log', level: 'debug'})
    ],
    format: winston.format.simple()
});

module.exports = logger;
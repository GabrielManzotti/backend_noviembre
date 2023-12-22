import winston from 'winston';
import config from './config.js'

// export const logger = winston.createLogger({
//     transports: [
//         new winston.transports.Console({
//             level: 'silly',
//             format: winston.format.combine(
//                 winston.format.colorize(),
//                 winston.format.simple()
//             )
//         }),
//         new winston.transports.File({
//             filename: './errors.log',
//             level: 'warn',
//             format: winston.format.combine(
//                 winston.format.timestamp(),
//                 winston.format.prettyPrint()
//             )
//         })
//     ]
// })

export let logger

if (config.ENVIRONMENT === 'production') {
    logger = winston.createLogger({
        transports: [
            new winston.transports.File({
                filename: './errors.log',
                level: 'error',
                format: winston.format.combine(
                    winston.format.timestamp(),
                    winston.format.prettyPrint()
                )
            })
        ]

    })
} else {
    logger = winston.createLogger({
        transports: [
            new winston.transports.Console({
                level: 'debug',
                format: winston.format.combine(
                    winston.format.colorize(),
                    winston.format.simple()
                )
            }),
        ]
    })
}
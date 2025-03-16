import winston from 'winston';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.simple(),
    winston.format.timestamp(),
    winston.format.printf(info => `[${info.timestamp}] ${info.level} ${info.message}`)
  ),
  transports: [
    new winston.transports.File({
      maxsize: 5120000,
      maxFiles: 5,
      filename: join(__dirname, '..', 'logs', 'log-api.log')
    }),
    new winston.transports.Console({
      level: 'debug'
    })
  ]
});

export default logger;

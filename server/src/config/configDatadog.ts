import tracer from 'dd-trace';

const winston = require('winston');

tracer.init({
  service: 'service1',
  env: process.env.DD_ENV,
  hostname: 'localhost',
  port: 4000,
  logInjection: true,
}); // initialized in a different file to avoid hoisting.

console.log('Datadog tracer installed');

// console.log(winston);

const logger_info = winston.createLogger({
  level: 'info',
  exitOnError: false,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  transports: [new winston.transports.Console()],
});

const logger_warn = winston.createLogger({
  level: 'warn',
  exitOnError: false,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  transports: [new winston.transports.Console()],
});

const logger_error = winston.createLogger({
  level: 'error',
  exitOnError: false,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  transports: [new winston.transports.Console()],
});

logger_info.info('Logger Initialized');

export { tracer, logger_info, logger_warn, logger_error };

const winston = require('winston');
const { LOG_LEVEL, LOGFILE_NAME } = require('config');
require('pkginfo')(module, 'name');

const logfileName = LOGFILE_NAME || 'combined.log';
const logLevel = LOG_LEVEL || 'info';

const logger = () => {
    return winston.createLogger({
        level: logLevel,
        format: winston.format.json(),
        defaultMeta: { service: module.exports.name },
        transports: [
            new winston.transports.Console(),
            new winston.transports.File({ filename: logfileName })
        ],
      });
};

module.exports = logger;
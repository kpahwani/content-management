const winston = require('winston');
const { LOG_LEVEL } = require('config');
require('pkginfo')(module, 'name');

const logLevel = LOG_LEVEL || 'info';
const serviceName = module.exports.name;

const logger = () => {
    return winston.createLogger({
        level: logLevel,
        format: winston.format.json(),
        defaultMeta: { service: serviceName },
        transports: [
            new winston.transports.Console()
        ],
      });
};

module.exports = logger;
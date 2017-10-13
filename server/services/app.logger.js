//require log4js library
const log4js = require('log4js');

//require the configuration file
const loggerConfig = require('../config/logger');

//configuring Log4j through a configuration file
log4js.configure(loggerConfig);

//initializing the logger
const logger = log4js.getLogger();

//exporting the logger
module.exports = logger;
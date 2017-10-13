module.exports = {

    appenders: {

        allLogs: { type: 'file', filename: './logs/app.log' },

        infoLogging: { type: 'file', filename: './logs/app-info.log' },

        'info': { type: 'logLevelFilter', appender: 'infoLogging', level: 'info' },


        debugLogging: { type: 'file', filename: './logs/app-debug.log' },

        'debug': { type: 'logLevelFilter', appender: 'debugLogging', level: 'debug' },


        errorLogging: { type: 'file', filename: './logs/app-error.log' },

        'error': { type: 'logLevelFilter', appender: 'errorLogging', level: 'error' },

    },
    categories: {
        default: { appenders: ['debug', 'error', 'info', 'allLogs'], level: 'debug' }
    }
};

const logger = require('../loggers/logger')
const BaseError = require('../libs/error/baseError')

function logError(err, req, res, next) {
    console.log('::: LogError :::');
    logger.error(err)

    // if (err instanceof BaseError && Object.getOwnPropertyNames(err).length) {
    //     console.log('ErrKeys =', Object.getOwnPropertyNames(err))
    //     for (const errItem of Object.getOwnPropertyNames(err)) {
    //         console.log(`${errItem}:`, err[errItem])
    //     }
    // }

    next(err)
}

function returnError(err, req, res, next) {
    console.log('::: ReturnError :::');

    const response = {
        status: 'error',
        message: err.message || 'UnknownError',
    };

    res.status(err.statusCode || 500).json(response)
}

function isOperationalError(error) {
    console.log('::: OperationalError :::');
    if (error instanceof BaseError) {
        return error.isOperational
    }
    return false
}

module.exports = {
    logError,
    returnError,
    isOperationalError
}
const httpStatusCodes = require('../httpStatusCodes')
const BaseError = require('./baseError')

class MyError extends BaseError {
    constructor(
        description = 'BAD_REQUEST',
        statusCode = httpStatusCodes.BAD_REQUEST,
        isOperational = true
    ) {
        super(description, statusCode, isOperational)
    }
}

module.exports = {
    MyError,
}
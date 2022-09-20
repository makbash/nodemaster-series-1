class BaseError extends Error {
    constructor(description, statusCode = 400, isOperational = true) {
        super(description)

        Object.setPrototypeOf(this, new.target.prototype)
        this.statusCode = statusCode
        this.isOperational = isOperational
        Error.captureStackTrace(this)
    }
}

module.exports = BaseError
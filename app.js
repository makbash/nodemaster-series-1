const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

const logger = require('./loggers/logger')
const httpLogger = require('./loggers/httpLogger')

const { returnError, isOperationalError, logError } = require('./middlewares/ErrorHandler');
const { MyError } = require('./libs/error/myError');
const httpStatusCodes = require('./libs/httpStatusCodes');

const app = express();
const port = 8090;

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// app.use(httpLogger)

// app.set('secret_key', 'test')
// console.log(app.get('secret_key'));

app.use((req, res, next) => {
    console.log(`******* ${req.path} *******`);
    return next()
})

const apiRoutes = express.Router()

app.use('/api', apiRoutes)
require('./routes')(app, apiRoutes)

app.use((req, res, next) => {
    return next(new MyError(`${req.path} => This route does not exist.`, httpStatusCodes.NOT_FOUND))
});

app.use(logError)
app.use(returnError)

// if the Promise is rejected this will catch it
process.on('unhandledRejection', error => {
    console.log('::: UnhandledRejection run :::');
    throw error
})

process.on('uncaughtException', error => {
    console.log('::: UncaughtException :::');
    logger.error(error)

    if (!isOperationalError(error)) {
        process.exit(1)
    }
})

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`))
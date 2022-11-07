const express = require('express');
const postRoutes = require('./posts');
const logger = require('../helpers/logger');

module.exports = function(app) {
    const router = express.Router();

    app.use('/', router);

    // middlewares
    router.use(express.urlencoded({ extended: true }));
    router.use(express.json());

    //Error Handler
    /**
    * @param error
    * @param req
    * @param res
    * @param next
    */
    function errorHandler(error, req, res, next) {
        logger.info(`Error in content-service`, { error });
        const statusCode = error.statusCode || 500;
        return res.status(statusCode).send({
            status: 'error',
            message: error.message
        });
    }
    //routes:
    router.use('', postRoutes);
    router.use(errorHandler);
};

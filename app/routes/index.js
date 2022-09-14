const express = require('express');
const postRoutes = require('./posts');

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
        console.log(`Error in content-service`, { error });
        const { statusCode } = error;
        return res.status(statusCode).send(error);
    }
    //routes:
    router.use('', postRoutes);
    router.use(errorHandler);
};
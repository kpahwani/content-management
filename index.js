const { server } = require('./app/server');
const logger = require('./app/helpers/logger');

server().then((app) => {
    const port = process.env.CONTENT_SERVICE_PORT || 8002;
    app.listen(port, () => {
        logger.info(`Content service is listening on port ${port}`);
    });
});

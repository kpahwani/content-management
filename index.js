const { server } = require('./app/server');

server().then((app) => {
    const port = process.env.CONTENT_SERVICE_PORT || 8002;
    app.listen(port, () => {
        console.log(`Content service is listening on port ${port}`);
    });
});

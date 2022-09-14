const { server } = require('./app/server');

server().then((app) => {
    const port = process.env.ISSUE_TO_BCF_PORT || 8002;
    app.listen(port, () => {
        console.log(`Content service is listening on port ${port}`);
    });
});

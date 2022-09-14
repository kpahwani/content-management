const express = require('express');
const app = express();
const routes = require('./routes');
require('./models')

function bootstrapServer() {
    routes(app);
    return Promise.resolve(app);
}

module.exports = {
    server: bootstrapServer
};

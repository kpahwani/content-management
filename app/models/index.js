const mongoose = require('mongoose');
const logger = require('../helpers/logger');
const config = require('config');

const server = '127.0.0.1:27017';
const database = 'insta_db_local';

const DB_CON_STRING = config.get('DB_CON_STRING') || `mongodb://${server}/${database}`;

class Database {
  constructor() {
    this._connect()
  }
  
_connect() {
     mongoose.connect(DB_CON_STRING)
       .then(() => {
        logger.info('Database connection successful');
       })
       .catch(err => {
        logger.error('Database connection error', err);
       })
  }
}

module.exports = new Database()

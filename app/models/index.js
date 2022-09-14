const mongoose = require('mongoose');
const { databaseConString } = require('config');

const server = '127.0.0.1:27017';
const database = 'insta_db_local';

const DB_CON_STRING = databaseConString || `mongodb://${server}/${database}`;

class Database {
  constructor() {
    this._connect()
  }
  
_connect() {
     mongoose.connect(DB_CON_STRING)
       .then(() => {
         console.log('Database connection successful')
       })
       .catch(err => {
         console.error('Database connection error')
       })
  }
}

module.exports = new Database()

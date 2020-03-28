const loki = require('lokijs');


const db = new loki('psych-dev.db');

const users = db.addCollection('users');

module.exports = {
    users
}
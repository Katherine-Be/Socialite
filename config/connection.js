const {connect, connection} = require('mongoose');

connect('mongodb://localhost/socialite-api');

module.exports = connection;

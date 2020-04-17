/**
 * Create socket.io API.
 */
var socketAPI = {};
socketAPI.io = require('socket.io')();

module.exports = socketAPI;
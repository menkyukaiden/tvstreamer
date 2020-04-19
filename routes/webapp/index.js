var express = require('express');
var router = express.Router();
const config = require('../../config/config.json');
const socket = require('../../socketAPI/socketAPI');
const sysperfmon = require('../../modules/sysperfmon');


const index_params = {

  title: "Welcom to TV Streamer",
  page: "home",
  config_menu: config.interface.menu
}

var perf_status = {}

/**
 * socket.io
 */

setInterval(() => {
  p = sysperfmon((data) => {
    mem.push(data.memory);
    mem.shift();

    cpu.push(data.currentload);
    cpu.shift();


    perf_status.memory = mem;
    perf_status.memorynow = data.memory;

    perf_status.cpu = cpu;
    perf_status.cpunow = data.currentload;

    

  })

}, 1000)

const io = socket.io;
io.on('connection', (socket) => {

  setInterval(() => {
    io.emit('home', perf_status);

  }, 1000)

})

var mem = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var cpu = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];





/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', index_params);
});

module.exports = router;

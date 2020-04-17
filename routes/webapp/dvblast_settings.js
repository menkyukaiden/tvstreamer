var express = require('express');
var router = express.Router();
const config = require('../../config/config.json');
const satList = require('../../dvb/modules/utils');
const socket = require('../../socketAPI/socketAPI');

const io = socket.io;
io.on('connection', (socket) => {
  socket.emit('startscan', 'Welcom !');
  socket.on('startscan', (data) => {
    console.log("received: ", data);

      io.emit("startscan", data);
    
  })
  
})



/* GET home page. */
const index_params = {
    page: "dvblast_settings",
    title: "Scan Management",
    config_menu: config.interface.menu,
    sat_list: satList(config.dvb.sat_config_file_folder),
    last_config_sat: config.dvbblast_settings_page.last_config_sat
}


router.get('/', function(req, res, next) {
  res.render('index', index_params);

});

module.exports = router;

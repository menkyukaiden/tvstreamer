var express = require('express');
var router = express.Router();
const config = require('../../config/config.json');
const satList = require('../../dvb/modules/utils');
const socket = require('../../socketAPI/socketAPI');
const scan = require('../../dvb/modules/dvbv5scan');


/**
 *  Define the parameters
 */

const index_params = {
  page: "dvblast_settings",
  title: "Scan Management",
  config_menu: config.interface.menu,
  sat_list: satList(config.dvb.sat_config_file_folder),
  tuner_list: config.dvb.tuner_list,
  scan_status: 0
}


/**
 * socket.io
 */


const io = socket.io;
io.on('connection', (socket) => {
  socket.emit('startscan', 'Welcom !');
  socket.on('startscan', (data) => {
    if ( data ) {
      
      p = scan(data.tuner, data.sat);
      //scan.unref();
      
      p.stdout.on('data', function(data) {
        //console.log(data.toString());
        index_params.scan_status = 1;
        io.emit("startscan", data.toString());
      });
      p.on('close', () => {
        console.log('scan stop');
        socket.emit('startscan', 'stopped')
        
      })
      

    }
    console.log("received: ", data);
      io.emit("startscan", "started");
  });
});

/**
 * Render page
 */
router.get('/', function(req, res, next) {
  //console.log("xxxxxxxx: ", t)
  res.render('index', index_params);

});

module.exports = router;

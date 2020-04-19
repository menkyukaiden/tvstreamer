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
  scan_status: 0,
  process: 0
}


/**
 * socket.io
 */


const io = socket.io;
io.on('connection', (socket) => {
  if (index_params.scan_status == 0 ) {
   // io.emit('startscan', 'stopped');
  }
  
  socket.on('startscan', (data) => {
    if ( data ) {
      io.emit('startscan', 'started');

      index_params.process = scan(data.tuner, data.sat);
      io.emit('startscan', `Start scanning ${data.sat} on Tuner ${data.tuner}`);
      
      index_params.process.stdout.on('data', function(data) {
        index_params.scan_status = 1;
        io.emit("startscan", data.toString().trim());
      });
      index_params.process.stderr.on('data', function(data) {
        index_params.scan_status = 1;
        io.emit("startscan", data.toString().trim());
      });

      index_params.process.on('close', (code) => {
        /*
        if (code !== 0) {
          console.log(`scan process exited with code ${code}`);
        };
        */
      io.emit('startscan', 'stopped'); 
      console.log('scan process exited');

        index_params.scan_status = 0;
           
      });

    }
    console.log("received: ", data);
      //io.emit("startscan", "started");
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

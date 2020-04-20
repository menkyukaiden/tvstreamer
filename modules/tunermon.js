module.exports = (callback) => {
    const cmd = require('../config/config.json').dvb["get-signal"];
  
    const { spawn } = require('child_process');
    const scan = spawn(cmd, [`-a${p1}`,'-lUNIVERSAL', `/home/ubuntu/tvstreamer/config/dvb/dtv-scan-tables/dvb-s/${p2}`], {
      detached: true,
    });
    /*
    scan.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });
  
    scan.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });
  
    scan.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
    });
  
    scan.on('error', (err) => {
      if (err) {
        return -1;
      }
    });
      */
    if (scan.pid) {
      return scan
    } else {
      return -1;
    }
    
}
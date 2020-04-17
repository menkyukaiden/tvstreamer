module.exports = function (parameters, callback) {
    
  const cmd = '/home/ubuntu/tvstreamer/dvb/modules/scanner.sh'

  const { spawn } = require('child_process');
  const scan = spawn(cmd, [parameters, '-l'], {
    detached: true,
  });

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
      callback(undefined, "-1")
    }
  });
  if (scan.pid) {
    callback(scan.pid)
  } else {
    callback("-1")
  }
}



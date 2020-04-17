var fs = require('fs');
var spawn=require('child_process').spawn;

var scan=spawn('./scanner.sh', ['-a0','-lUNIVERSAL','/usr/local/share/dvbv5/dvb-s/Nilesat101+102-7.0W']); // runs the 'ls -lh /usr' shell cmd
console.log("process PID: ", scan.pid)
//commad = 'dvbv5-scan -a0 -lUNIVERSAL /usr/local/share/dvbv5/dvb-s/Nilesat101+102-7.0W';
scan.stdout.on('data', function(data) { // handler for output on STDOUT
    console.log('stdout: '+data);
    fs.appendFile('scan.log', data, function(err) {
        // If an error occurred, show it and return
        if(err) return console.error(err);
        // Successfully wrote to the file!
      });
});

scan.stderr.on('data', function(data) { // handler for output on STDERR
    console.log('stderr: '+data);
    fs.appendFile('scan.log', data, function(err) {
        // If an error occurred, show it and return
        if(err) return console.error(err);
        // Successfully wrote to the file!
      });
});

scan.on('exit', function(code) { // handler invoked when cmd completes
    console.log('child process exited with code '+code);
});
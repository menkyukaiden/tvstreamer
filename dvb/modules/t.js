
function listSatConfigFiles () {
    var s = [];
    var dir = require('node-dir');
    var directory = "/home/ubuntu/tvstreamer/config/dvb/dtv-scan-tables/dvb-s"

    dir.promiseFiles(directory, 'file')
    .then((files) => {
        return files;
    })
    .then((dd) => {
        s = dd;
        console.log(dd)
    })
    return s;
}
console.log(listSatConfigFiles()) 
 

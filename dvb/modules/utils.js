module.exports = function listConfigFiles (directory) {
    var dir = require('node-dir');
    const path = require('path');
    //var directory = "/home/ubuntu/tvstreamer/config/dvb/dtv-scan-tables/dvb-s"
    mydir =  dir.files(directory, {sync: true});
    var filelist = new Array();

    for (i in mydir) {
        //console.log(mydir[i])
        filelist.push(path.basename(mydir[i]))
    }
    return filelist;
}

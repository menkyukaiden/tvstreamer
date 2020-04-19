module.exports = (callback) => {
    const si = require('systeminformation');
    var sysinfo = {};
        si.mem()
        .then(data => {
            sysinfo.memory = 100 - Math.round((data.free / data.total)*100);
            callback(sysinfo);

        })
        .catch(error => console.error(error));

        si.currentLoad()
        .then(data => {
            sysinfo.currentload = Math.round(data.currentload)
            //console.log(sysinfo.currentload)
        })
        
    }
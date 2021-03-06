/**
 * Function description
 *
 * @alias namespace~doStuff
 */

module.exports = (callback) => {
    const si = require('systeminformation');
    var sysinfo = {};
        si.mem()
        .then(data => {
            sysinfo.memory = 100 - Math.round((data.free / data.total)*100);
            //console.log(data);
        })
        .catch(error => console.error(error));

        si.currentLoad()
        .then(data => {
            sysinfo.currentload = Math.round(data.currentload);
        })

        si.cpu()
        .then((data) => {
            sysinfo.cpubrand = data.brand;
            
            callback(sysinfo);
        })
        .catch(error => console.error(error));
        
    }
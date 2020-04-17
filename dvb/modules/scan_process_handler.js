
module.exports = function scan_process_handler (action, pid, int_id, res) {
    const scan = require('../modules/dvbv5scan');
    switch (action) {
        case 'scan':
            if (pid && pid != 0) {
                result = {
                    status: "running",
                    Interface: int_id,
                    Process: pid
                }
                res.json(result);
            } else {
                // start scan
                scan('interface_'+int_id, (pid) => {
                    pid = pid;
                })
                if (pid != "Error") {
                    result = {
                        Pid: pid,
                        Status: 'Success',
                        Interface: int_id
                    }
                    res.json(result);
                } else {
                    pid = 0;
                    result = {
                        Status: 'Unexpected Error',
                        Interface: int_id
                    }
                    res.json(result);
                }
            }
            break;

        case 'stop':
            if (pid && pid != 0) {
                process.kill(pid)
                console.log("process killed: ", pid)
                pid = 0;
                result = {
                    Status: 'stopped',
                    Pid: pid,
                    Interface: int_id
                };
                res.json(result)
            } else if (pid == 0) {
                result = {
                    Status: 'no such process',
                    Interface: int_id
                };
                res.json(result)
            } else {
                result = {
                    Status: 'Interface does not exist',
                    Interface: int_id
                };
                res.json(result)  
            }
            break;

        case 'status':
            if ( pid && pid != 0) {
                result = {
                    Status: 'running',
                    Pid: pid,
                    Interface: int_id
                }
                res.json(result)
            } else {
                result = {
                    Status: 'None',
                    Interface: int_id
                }
                res.json(result)
            }
            break;
        default:
            break;
    }

}
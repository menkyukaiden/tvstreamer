var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
const scan = require('../../../../dvb/modules/dvbv5scan');

var interface_status = {};

router.use(express.json());

// Start
router.post('/start/:id', (req, res) => {
    var int_id = req.params.id;

    if (interface_status['interface_'+int_id] && interface_status['interface_'+int_id] != 0) {

        result = {
            Status: 100,
            Message: 'running',
            Interface: int_id,
            Process: interface_status['interface_'+int_id]
        }
        res.json(result);
    } 
    else {
        // start scan
        scan('interface_'+int_id, (pid) => {
            interface_status['interface_'+int_id] = pid;
        })

        if (interface_status['interface_'+int_id] != "-1") {
            result = {
                Process: interface_status['interface_'+int_id],
                Status: 100,
                Message: 'running',
                Interface: int_id
            }
            res.json(result);
        } else {
            interface_status['interface_'+int_id] = 0;
            result = {
                Status: 300,
                Message: 'Error',
                Interface: int_id
            }
            res.json(result);
        }
    }
})

// Stop
router.post('/stop/:id', (req, res) => {
    var int_id = req.params.id;

    if (interface_status['interface_'+int_id] && interface_status['interface_'+int_id] != 0) {
        process.kill(interface_status['interface_'+int_id])
        console.log("process killed: ", interface_status['interface_'+int_id])
        interface_status['interface_'+int_id] = 0;
        result = {
            Status: 'stopped',
            Process: interface_status['interface_'+int_id],
            Interface: int_id
        };
        res.json(result)
    } else if (interface_status['interface_'+int_id] == 0) {
        result = {
            Status: 'stopped',
            Interface: int_id
        };
        res.json(result)
    } else {
        result = {
            Status: 'err',
            Message: 'Interface does not exist',
            Interface: int_id
        };
        res.json(result)  
    }    
})

// Status
router.get('/status/:id', (req, res) => {
    //console.log(interface_status['interface_'+req.params.id])
    var int_id = req.params.id;

    if ( interface_status['interface_'+req.params.id] && interface_status['interface_'+req.params.id] != 0) {
        result = {
            Status: 100,
            Message: 'running',
            Process: interface_status['interface_'+req.params.id],
            Interface: int_id
        }
        res.json(result)
    } else {
        result = {
            Status:  200,
            Message: 'none',
            Interface: int_id
        }
        res.json(result)
    }
})

module.exports = router;

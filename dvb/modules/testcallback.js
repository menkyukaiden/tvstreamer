const scan1 = require('./dvbv5scan.js')

const p = scan1('-1', '-2', '-3', (err, data)=>{
    console.log("xxxxxxx")
    
});
console.log(p)
process.kill(p)
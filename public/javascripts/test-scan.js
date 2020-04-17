document.getElementById('tunerStatusButton').addEventListener('click', () => {
    startScan()
});
function startScan() {
    //setInterval(() => {
        var e = document.getElementById("TunnerListSelect");
        var value = e.options[e.selectedIndex].value;
        //var text = e.options[e.selectedIndex].text;
        fetch(`/api/v1/dvbv5scan/start/${value}`, {
            method: "POST"
        })
        .then((res) => {
            return res.text();
        })
        .then((data) => {
            var d = JSON.parse(data);
            
            if (d.Status == 100) {
                console.log("xxx",d.Status);
                b = document.getElementById('tunerStatusButton');
                b.innerHTML = "Scaning... ";
                b.innerHTML += '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true", id="scanButtonSpinner"></span>'
                b.setAttribute("disabled", "true");
                document.getElementById('TunnerListSelect').setAttribute("disabled", "true")
                document.getElementById('SatListSelect').setAttribute("disabled", "true")

            }

        })
        .catch((err) => console.log(err))

    //}, 1000);
}
function scanStatus() {
    var e = document.getElementById("TunnerListSelect");
    var value = e.options[e.selectedIndex].value;
    setInterval(() => {
    fetch(`/api/v1/dvbv5scan/status/${value}`)
    .then((res) =>{
        return res.text();
    })
    .then((data) => {
        var d = JSON.parse(data);
        console.log(d.Status);
        if (d.Status == 200 || d.Status == 300) {
            
            //document.getElementById('TunnerListSelect').setAttribute("disabled", "false");
            //document.getElementById('SatListSelect').setAttribute("disabled", "false");
            //if (document.getElementById('scanButtonSpinner')){
            //    document.getElementById('scanButtonSpinner').remove();
            //};
            var b = document.querySelector("#tunerStatusButton").setAttribute("disabled", "false");
            b.innerHTML="Start Scan";
            //b.innerHTML = "Start Scan";
            //b.disabled = false;
            //b.setAttribute("disabled", "true");
            if (document.querySelector(".scan-spinner")) {
                document.querySelector(".scan-spinner").setAttribute("hidden", "true");
            }
            
        } else {
            b = document.getElementById('tunerStatusButton');
                b.innerHTML = "Scaning... ";
                b.innerHTML += '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true", id="scanButtonSpinner"></span>'
                b.setAttribute("disabled", "true");
                document.getElementById('TunnerListSelect').setAttribute("disabled", "true");
                document.getElementById('SatListSelect').setAttribute("disabled", "true");
            
        }
        
    })
}, 2000)

}
document.getElementById('tunerStatusButton').addEventListener('load', scanStatus());

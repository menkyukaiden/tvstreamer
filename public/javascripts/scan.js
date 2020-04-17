
const socket = io();
socket.on('startscan', (data) => {
    console.log("received: ", data);
});

function showAndDismissAlert(type, message) {
    $("#scan-alert").first().hide().fadeIn(200).delay(2000)
    .fadeOut(1000,  () =>{ 
        document.querySelector('#scan-alert').setAttribute('hidden', 'hidden')
        //$(this).remove(); 
    });
}

window.addEventListener("load", () => {

    var sf = document.querySelector('#scanform');
    var tl = document.querySelector('#TunnerListSelect');
    var sl = document.querySelector('#SatListSelect');
    var sa = document.querySelector('#scan-alert');

    var b = document.querySelector('#tunerStatusButton');
    var s = document.querySelector('#SpinnerScaning');

    socket.on('disconnect', () => {
        
        tl.removeAttribute('disabled');
        sl.removeAttribute('disabled');
        showAndDismissAlert('danger', 'Error');
        b.removeAttribute('disabled');
        b.textContent = 'Start Scan';
        if(s) {
            s.setAttribute('hidden', 'hidden')
        }
    });

    sf.addEventListener('submit', (e) => {
        e.preventDefault();
        var tuner = document.querySelector('#TunnerListSelect').value;
        var sat = document.querySelector('#SatListSelect').value;
        showAndDismissAlert('success', 'Saved Successfully!');

        tl.setAttribute('disabled', 'disabled');
        sl.setAttribute('disabled', 'disabled');
        sa.removeAttribute('hidden');
        b.textContent = 'Scanning... ';
        b.innerHTML += '<span role="status" aria-hidden="true" id="SpinnerScaning" class="spinner-border spinner-border-sm scan-spinner"></span>';
        b.setAttribute('disabled', 'disabled');
        var h = {
            tuner: tuner,
            sat: sat
        }
        socket.emit('startscan', h);

    });


});

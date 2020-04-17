
const socket = io();
socket.on('startscan', (data) => {
    console.log("received: ", data);
})
window.addEventListener("load", () => {

    document.querySelector('#scanform').addEventListener('submit', (e) => {
        e.preventDefault();
        //const message1 = e.target.elements.message;
        const message1 = document.querySelector('#TunnerListSelect').value;
        const message2 = document.querySelector('#SatListSelect').value;
        socket.emit('startscan', message1);
        socket.emit('startscan', message2);
    })
});

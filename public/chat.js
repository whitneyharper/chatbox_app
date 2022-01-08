const socket = io();

//QUERY DOM
const message = document.getElementById('message');
const name = document.getElementById('name');
const button = document.getElementById('send');
const output = document.getElementById('output');

//EMIT EVENTS
button.addEventListener('click', () => {
    socket.emit('chat message', {
        message: message.value,
        name: name.value
    });
})

//LISTEN FOR EVENTS
socket.on('chat message', (data) => {
    output.innerHTML += `<p><strong> ${data.name} : </strong> ${data.message}</p>`
})
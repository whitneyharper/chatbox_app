const express = require('express');
const app = express();
const port = 3000;
const socket = require('socket.io');

app.use(express.static('public'));

//SERVER
const server = app.listen(port, () => {
    console.log(`Server is running. Listening on ${port}`);
});

//SOCKET SETUP
const io = socket(server);

io.on('connection', (socket) => {
    console.log(`socket connection activated.`);

    socket.on('chat message', (data) => {
        io.emit('chat message', data);
    })
})

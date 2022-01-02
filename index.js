const express = require('express');
const app = express();
const port = 3000;
const socket = require('socket.io');

app.get('/', (req, res) => {
    res.sendFile('public/index.html' , { root : __dirname})
});

//SERVER
const server = app.listen(port, () => {
    console.log(`Server is running. Listening on ${port}`);
});

//SOCKET SETUP
const io = socket(server);

io.on('connection', (socket) => {
    console.log(`socket connection activated.`);
})

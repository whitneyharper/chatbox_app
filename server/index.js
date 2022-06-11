require("dotenv").config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const socket = require('socket.io');
const cors = require('cors');
const Message = require('./message');

app.use(cors());

//Database
const dbSetup = require('./database');
dbSetup();

//SERVER
const server = app.listen(port, () => {
    console.log(`Server is running. Listening on ${port}`);
});

//SOCKET SETUP
const io = socket(server);

io.on('connection', (socket) => {
    console.log(`Socket connection activated.`);

    // Get the last 10 messages from the database.
    Message.find().sort({createdAt: -1}).limit(10).exec((err, messages) => {
        if (err) return console.error(err);

        //Send the last messages to the user
        socket.emit('chat thread', messages);
    })

    // Listen to connected users for a new message.
  socket.on('message', (msg) => {
    // Create a message with the content and the name of the user.
    Message.create({
        body: msg.body,
        user: msg.user
    }, (err, chat) => {
        if (err) {
            console.log(err);
        } 
    })
    

    // Save the message to the database.
    // message.save((err) => {
    //   if (err) return console.error(err);
    // });

    // Notify all other users about a new message.
    socket.broadcast.emit('new message', msg);
  });
})

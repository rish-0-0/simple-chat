const express = require('express');
require('dotenv').config();
const path = require('path');
const app = express();
const socket = require('socket.io');
const port = 4203;
const server = app.listen(port, () => {
    console.log(`Waiting for connections on ::${port}`);
});

// Static Files
if(process.env.NODE_ENV==="production") {
    app.use(express.static(path.join(__dirname,'client/build')));
    app.get("*", (req,res) => {
        res.sendFile(path.join(__dirname,"client/build","index.html"));
    });
}

// Ready the input/output 
const io = socket(server);

io.on('connection', (socket) => {
    console.log(`connection established via id: ${socket.id}`);
    socket.on('online', () => {
        console.log('A new user has joined the chat');
        io.sockets.emit('joined',{
            'success':true,
        });
    });

    socket.on('chat', (data) => {
        console.log('initiated',data);
        io.sockets.emit('chat', data);
    });

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing',data);
    });
});

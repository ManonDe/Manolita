'use strict';

// SERVER
const server = require('http').createServer();
const port = process.env.PORT || 3000;
const io = require('socket.io')(server);


io.on('connection', (socket) => {
    socket.on('TEST', () => {
        console.log('Connected');
    });
});

server.listen(port, (data) => {
    console.log('JYO: createServer: data: ', data);
});

// CLIENT
const clientSocket = require('./node_modules/socket.io-client')(`http://localhost:${port}`);

clientSocket.on('connect', () => {
    clientSocket.emit('TEST');
});

global.io = io;     //permet de mettre io en global pour le back (permet d'y accéder)
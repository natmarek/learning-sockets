const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require("socket.io")
io = new Server(server) // we initialize new instance of socket.io by passing server object
//Express initializes app to be a function handler we supply to an HTTP server 
app.get('/', (req,res) => {
    res.sendFile(__dirname + '/index.html')
})



io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });
  });
io.on('connection', (socket) => {
    console.log('user connected');
    socket.on('disconnect', ()=>{
        console.log('user disconnected');
    })
    socket.on('chat message', (msg) => {
        io.emit('message: ' + msg);
    })
}) // here we listen on the connection event for incoming sockets



server.listen(3000, () => {
    console.log('listening on 3000');
})

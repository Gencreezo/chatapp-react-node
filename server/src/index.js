const express = require('express');
const http = require('http');
const {Server} = require('socket.io');

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3001

const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
    }
})


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
});

let interval;

io.on("connection", (socket) => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg)
    io.emit('chat message', msg)
  });
});

// io.on('connection', (socket) => {
//     console.log('a user connected');
//     socket.broadcast.emit('hi')
//     socket.on('disconnect', () => {
//         console.log('user disconnected')
//     });
//     socket.on('chat message', (msg) => {
//         console.log('message: ' + msg)
//         io.emit('chat message', msg)
//     });
// })

const getApiAndEmit = socket => {
    const response = new Date();
    // Emitting a new message. Will be consumed by the client
    socket.emit("FromAPI", response);
  };

server.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
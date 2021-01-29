const express = require('express');
const path = require('path')
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname,'public')))
let chattings = []
io.on('connection', (socket) => {
  console.log(`연결되었습니다`)
  socket.on('chat', data => {
    io.emit('chat', data);
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
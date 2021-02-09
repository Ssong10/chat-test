const express = require('express');
const path = require('path')
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 5000;

const time = () => {
  const date = new Date()
  const h = date.getHours()
  const ap = h < 12 ? "오전" : "오후"
  const hh = h < 12 ? (h+11)%12 + 1 : (h-1)%12+1
  let mm = date.getMinutes()
  mm = mm < 10 ? '0'+mm : mm
  return `${ap} ${hh}:${mm}`
}

app.use(express.static(path.join(__dirname,'public')))
io.on('connection', (socket) => {
  console.log(`연결되었습니다`, socket.id)
  socket.on('chat', data => {
    io.emit('chat', {...data,time:time() })
  });
});


http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
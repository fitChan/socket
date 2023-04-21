const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server,{
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// 클라이언트가 접속하면 실행
io.on('connection', (socket) => {
  console.log('a user connected');

  // 클라이언트로부터 메시지를 받으면 실행
  socket.on('set_ur_emit_key', (this_is_msg_content) => {
    console.log('message: ' + this_is_msg_content);
    // 모든 클라이언트에게 메시지 전송
    io.emit('send_to_ur_audience', this_is_msg_content);
  });

  // 클라이언트가 접속을 종료하면 실행
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// 서버 실행
server.listen(3000, () => {
  console.log('listening on *:3000');
});

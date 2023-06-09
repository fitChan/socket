const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// 클라이언트가 접속하면 실행
io.on('connection', (socket) => {

  socket.on('join', (room) => {
    socket.join(room); // join socket to the room
    socket.emit('join', room)
  });
  // 클라이언트로부터 메시지를 받으면 실행
  socket.on('set_ur_emit_key', (this_is_msg_content) => {
    console.log('message: ' + this_is_msg_content.input);
    io.to(this_is_msg_content.room).emit('send_to_ur_audience', this_is_msg_content);
  });

  // 클라이언트가 접속을 종료하면 실행
  socket.on('disconnect', () => {
    console.log('A user has disconnected.');
  });

  // 일정 시간이 지나면 연결 끊기

  // 클라이언트로부터 disconnect_me 이벤트를 받으면 연결 끊기
  socket.on('disconnect_me', (reason) => {
    // console.log('10초 지났어 여기서 redis연결해서 오프라인값 저장하면 되겠지?');
  });
});

// 서버 실행
server.listen(3000, () => {
  console.log('listening on *:3000');
});

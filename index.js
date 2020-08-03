const app = require('express')()
const http = require('http').createServer(app)
const socketio = require('socket.io')(http)

app.get('/', (req, res) => {
    res.send("Good Server")
})
var numUsers = 0;

socketio.on("connection", (userSocket) => {
    userSocket.on("send_message", (data) => {
        userSocket.broadcast.emit("receive_message", data)
    })

    userSocket.on("typing", (data) => {
        userSocket.broadcast.emit("typing", data)
    })

    userSocket.on("stop_typing", (data) => {
        userSocket.broadcast.emit("stop_typing", data)
    })
})
  socket.on('disconnect', () => {
    if (addedUser) {
      --numUsers;

      // echo globally that this client has left
      socket.broadcast.emit('user left', {
        username: socket.username,
        numUsers: numUsers
      });
    }
  });
});
socket.on('add user', (username) => {
    if (addedUser) return;

    // we store the username in the socket session for this client
    socket.username = username;
    ++numUsers;
    addedUser = true;
    socket.emit('login', {
      numUsers: numUsers
    });
    // echo globally (all clients) that a person has connected
    socket.broadcast.emit('user joined', {
      username: socket.username,
      numUsers: numUsers
    });
  });

http.listen(process.env.PORT)

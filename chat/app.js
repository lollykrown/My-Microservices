const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const path = require("path");
const formatMessage = require("./utils/messages");
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers
} = require('./utils/users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, "public")));

// Runs when client connects
io.on("connection", (socket) => {
  socket.on("joinRoom", ({ username, room }) => {
    const user = userJoin(socket.id, username, room);

    socket.join(user.room);

    // This emits to a single client
    // Welcome new user
    socket.emit("message", formatMessage('Chat App', 'Welcome to Chat App'));

    //broadcast when a user connects, broadcast emits to everyone except the sender
    //io.emit is to everyone with no exception, socket.emit is to a single user
    socket.broadcast.to(user.room).emit(
      "message",
      formatMessage('Chat App', `${user.username} just joined the chat`)
    );

    //Send users and room info
    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room)
    })
  });


  //Listen for chat message from the frontend
  socket.on("chatMessage", (msg) => {
    const user = getCurrentUser(socket.id);

    io.to(user.room).emit('message', formatMessage(user.username.toUpperCase(), msg));
  });

  //Runs when client disconnects
  socket.on("disconnect", () => {
    io.emit("message", formatMessage("kayode", "A user just left the chat"));
    const user = userLeave(socket.id);

    if (user) {
      io.to(user.room).emit(
        'message',
        formatMessage(botName, `${user.username.toUpperCase()} has left the chat`)
      );

      // Send users and room info
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room)
      });
    }
  });
});

port = process.env.PORT || 4000;

server.listen(port, function () {
  console.log(`Listening on port ${port}...`);
});

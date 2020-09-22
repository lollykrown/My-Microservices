const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const path = require('path');

const app = express();
const server = http.createServer(app)
const io = socketio(server)

app.use(express.static(path.join(__dirname, 'public')))

//runs when client connects
io.on('connection', socket => {
  console.log('New connection');

  // this emits to a single client
  // Welcome new user
  socket.emit('message', 'Welcome to Chat app')

  //broadcast when a user connects, broadcast emits to everyone except the sender
  //io.emit is to everyone with no exception, socket.emit is to a single user
  socket.broadcast.emit('message', 'A user just joined the chat')


  //Runs when client disconnects
  socket.on('disconnect', () => {
    io.emit('message', 'A user just left the chat')
  })
})


port = process.env.PORT || 4000

server.listen(port, function () {
  console.log(`Listening on port ${port}...`)
}) 
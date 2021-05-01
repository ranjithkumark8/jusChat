const express = require("express");
const socketio = require("socket.io");
const cors = require("cors");
const http = require("http");

const moment = require("moment");
const { addUser, removeUser, getUser, getUsersInRoom } = require("./users.js");
const PORT = process.env.PORT || 5000;

const router = require("./router");

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  //  console.log("We have a new connection!!!")
  socket.on("join", ({ name, room }, callback) => {
    //  console.log(name,room);
    //  const error1 = false;
    //  if(error1)
    //  {
    //      callback({error:`error`})
    //  }
    const { error, user } = addUser({ id: socket.id, name, room });
    if (error) return callback(error);
    socket.emit("message", {
      user: "admin",
      text: `${user.name}, welcome to the room ${user.room}`,
      time: moment().format("h:mm a"),
    });
    socket.broadcast.to(user.room).emit("message", {
      user: "admin",
      text: `${user.name}, has joined!`,
      time: moment().format("h:mm a"),
    });
    socket.join(user.room);
    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });
    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit("message", {
      user: user.name,
      text: message,
      time: moment().format("h:mm a"),
    });
    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });
    callback();
  });
  //   var destination = '/';
  //   socket.emit('redirect', destination);

  socket.on("disconnect", () => {
    console.log("User had left!!!");
    //if we dont remove our user then after refreshing we dont get any welcome message
    const user = removeUser(socket.id);

    if (user !== null) {
      io.to(user.room).emit("message", {
        user: "admin",
        text: `${user.name} has left.`,
        time: moment().format("h:mm a"),
      });
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });
});
app.use(router);
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));

const express = require("express");
const cors = require("cors");
const http = require("http");
const socketio = require("socket.io");
const {
  userJoin,
  getGroupUsers,
  getCurrentUser,
  removeUser,
} = require("./utils/users");
const formatMessage = require("./utils/message");

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "http://localhost:3000",
    method: ["GET", "POST", "OPTIONS"],
  },
});
const botName = "Admin";
io.on("connection", (socket) => {
  // console.log("New Socket Connection");

  // Listen for join Group and then need to send message
  socket.on("joinGroup", ({ userName, group }, callback) => {
    const { error, user } = userJoin(socket.id, userName, group);
    // console.log(error, user);
    if (error) return callback(error);
    socket.join(user.group);
    //   Welcome user message
    socket.emit("message", formatMessage(botName, `Welcome to ${user.group}`));

    //   Notify the group that someone has joined
    socket.broadcast
      .to(user.group)
      .emit(
        "message",
        formatMessage(botName, `${user.userName} has joined the ${user.group}`)
      );
    io.to(user.group).emit("groupUsers", {
      group: user.group,
      users: getGroupUsers(user.group),
    });

    //   Listen for Chat message
    socket.on("chatMessage", (message) => {
      // console.log(message);
      const user = getCurrentUser(socket.id);
      io.to(user.group).emit("message", formatMessage(user.userName, message));
    });
    socket.on("disconnect", () => {
      console.log("Client Disconnected");
      const user = removeUser(socket.id);
      if (user) {
        io.to(user.group).emit(
          "message",
          formatMessage(botName, `${user.userName} has left.`)
        );
        io.to(user.group).emit("groupUsers", {
          group: user.group,
          users: getGroupUsers(user.group),
        });
      }
    });
    // callback();
  });
});

const start = () => {
  server.listen(2244, () => {
    console.log("Listening to the server 2244");
  });
};

module.exports = start;

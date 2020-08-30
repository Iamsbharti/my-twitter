const socketio = require("socket.io");
const mongoose = require("mongoose");
const events = require("events");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const socketContol = (server) => {
  let io = socketio.listen(server);
  io.origins("*:*");
  io.on("connection", (socket) => {
    console.log("Emit on connection");
    socket.emit("authenticate", "");

    //authorize user
    socket.on("set-user", (authToken) => {
      console.log("Authenticating user");
      if (authToken) {
        jwt.verify(authToken, process.env.TOKEN_SECRET, (error, decoded) => {
          if (error != null) {
            console.error("Auth-Error");
            socket.emit("Auth-Error", error);
          } else {
            console.error("Auth Success");
            socket.emit("auth-success");
          }
        });
      }
    });
  });
};

module.exports = {
  socketContol,
};

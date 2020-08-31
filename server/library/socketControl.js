const socketio = require("socket.io");

exports.socketServer = (server) => {
  console.log("Socket Sever Init");
  let io = socketio.listen(server);
  let myio = io.of("/chat");
  let onlineUsers = [];
  //on connection
  myio.on("connection", (socket) => {
    console.log("connected client");
    /**Emmitt welcome text */
    socket.emit("welcome", "Welcome to My-Twitter");

    /**Listen to room name and emit online users list */
    socket.on("room", (room) => {
      console.log("Room", room);
      //join chat room
      socket.join(room);
      console.log("onlineusers-array", onlineUsers);
      myio.to(room).emit("online-users", onlineUsers);
    });
    /**Listen to text-message */
    socket.on("textSent", (data) => {
      console.log("Recieved text ", data);
      myio.emit("textRecieved", data);
    });
    /**Listen to disconnect event */
    socket.on("offline", (data) => {
      console.log("Client Disconnected", data);
      myio.emit("userOffline", `${data} left the room`);
      onlineUsers = onlineUsers.filter((user) => user !== data);
      console.log("offline", onlineUsers);
      return onlineUsers;
    });
  });
};

const socketio = require("socket.io");
const User = require("../models/User");
const Post = require("../models/Post");
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
    let roomId = "followers";

    /**join a room */
    socket.join(roomId);

    /**listen for new tweets and emit them for appropiate users*/
    socket.on("post_tweet", (data) => {
      socket.to(roomId).emit("new_tweet", data);
    });

    /**listen for comments on posts */
    socket.on("user_added_comment", async (data) => {
      /**find the user related to the commented post */
      let postFound = await Post.findOne({ postId: data.postId });
      console.log("post found::", postFound.userId);
      socket.to(roomId).emit("comment_on_post", {
        ...data,
        usersPostID: postFound.userId,
      });
    });
    /**Listen to room name and emit online users list */
    socket.on("room", (room) => {
      console.log("Room", room);
      //join chat room
      socket.join(room);
      console.log("onlineusers-array", onlineUsers);
      socket.to(room).emit("online-users", onlineUsers);
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

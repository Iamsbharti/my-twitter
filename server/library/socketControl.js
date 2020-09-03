const socketio = require("socket.io");
const User = require("../models/User");
const Post = require("../models/Post");
const Chat = require("../models/Chat");
const events = require("events");
const logger = require("../library/logger");
const eventEmitter = new events.EventEmitter();
const shortid = require("shortid");

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
      socket.to(roomId).emit("comment_on_post", {
        ...data,
        usersPostID: postFound.userId,
      });
    });

    /**listen for actions(like,retweets,shares,bookmarks) on post  */
    socket.on("action_on_post", async (data) => {
      /**find the user related to the commented post */
      let postFound = await Post.findOne({ postId: data.postId });
      let actionUser = await User.findOne({ userId: data.userId });
      /**compute action based on update's value of data */
      let { update } = data;
      let postAction = "";
      if (update.hasOwnProperty("retweets")) postAction = "retweeted";
      if (update.hasOwnProperty("likes") && update.likes === 1)
        postAction = "liked";
      if (update.hasOwnProperty("likes") && update.likes === -1)
        postAction = "disliked";
      if (update.hasOwnProperty("shares")) postAction = "shared";
      if (update.hasOwnProperty("bookmark") && update.bookmark)
        postAction = "bookmarked";
      if (update.hasOwnProperty("bookmark") && !update.bookmark)
        postAction = "removed from bookmarks";

      /**notify clients for this action on their post */
      let notificationPayLoad = {
        postOwnerId: postFound.userId,
        message: `${actionUser.name} ${postAction} your post`,
        postInfo: data,
      };
      socket.to(roomId).emit("notify_post_action", notificationPayLoad);
    });

    /**listen to new message event and save it */
    socket.on("new_text", (data) => {
      logger.info("New text arrived");
      //emit event emiiter to save the message
      setTimeout(() => eventEmitter.emit("save-chat", data), 1000);
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

  /**save chat emitEmitter listener */
  eventEmitter.on("save-chat", async (data) => {
    const { senderId, senderName, recieverId, recieverName, message } = data;
    /**create new chat schema */
    let newChat = new Chat({
      chatId: shortid.generate(),
      senderId: senderId,
      senderName: senderName,
      recieverId: recieverId,
      recieverName: recieverName,
      message: message,
    });
    /**save chat */
    let savedChat = await Chat.create(newChat);
    /**emit new text for reciever */
    myio.emit(data.recieverId, savedChat);
  });
};

import io from "socket.io-client";
/**initialize socket */
const url =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:3001/chat";
const socket = io(url);
export default socket;

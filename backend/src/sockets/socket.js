import { Server } from "socket.io";
import { socketAuth } from "./auth.socket.js";
import { registerChatEvents } from "./chat.socket.js";

let io;

const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    },
  });

  // Authenticate every socket connection
  io.use(socketAuth);

  io.on("connection", (socket) => {
    console.log(`${socket.user.username} Connected`);

    // Register all chat events
    registerChatEvents(socket);

    socket.on("disconnect", () => {
      console.log(`${socket.user.username} Disconnected`);
    });
  });

  return io;
};

const getIO = () => {
  if (!io) {
    throw new Error("Socket.IO is not initialized");
  }

  return io;
};

export { initSocket, getIO };




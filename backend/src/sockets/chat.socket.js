import { Chat } from "../model/chat.model.js";
import { Creator } from "../model/creatorProfile_model.js";
import { Brand } from "../model/BrandProfile_model.js";
const registerChatEvents = (socket) => {
  socket.on("join-chat", async (chatId) => {
    try {
      const chat = await Chat.findById(chatId);
      if (!chat) {
        return socket.emit("join-chat-erro", {
          success: false,
          message: "Unauthorised",
        });
      }

      if (socket.user.role === "creator") {
        const creator = await Creator.findOne({
          userId: socket.user._id,
        });
        // validate
        if (!creator) {
          return socket.emit("error", "Creator profile not found");
        }
        if (!chat.creatorId.equals(creator._id)) {
          return socket.emit("join-chat-error", {
            success: false,
            message: "Unauthorized",
          });
        }
      }
      if (socket.user.role === "brand") {
        const brand = await Brand.findOne({
          userId: socket.user._id,
        });
        if (!brand) {
          return socket.emit("join-chat-error", "brand profile not found");
        }
        if (!chat.brandId.equals(brand._id)) {
          return socket.emit("join-chat-error", {
            success: false,
            message: "Unauthorised",
          });
        }
      }
      // join room
      socket.join(chatId);
      socket.emit("joined-chat", {
        success: true,
        chatId,
        message: "Joined successfully",
      });
      console.log(`${socket.user.username} joined room  ${chatId}`);
    } catch (error) {
      socket.emit("join-chat-error", {
        success: false,
        message: error.message,
      });
    }
  });
  socket.on("leave-chat", (chatId) => {
    socket.leave(chatId);
    socket.emit("leave-chat-success", {
      success: true,
      chatId,
      message: "Left chat successfully",
    });
    console.log(`${socket.user.username} left room ${chatId}`);
  });
};

export { registerChatEvents };

import { Chat } from "../model/chat.model.js";
import { Message } from "../model/message.model.js";
import { Creator } from "../model/creatorProfile_model.js";
import { Brand } from "../model/brandProfile_model.js";
import { getIO } from "../sockets/socket.js";
import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Notification } from "../model/notification.model.js";

const getMyChats = asyncHandler(async (req, res) => {
  let chats = [];
  if (req.user.role === "creator") {
    const creator = await Creator.findOne({
      userId: req.user._id,
    });
    if (!creator) {
      throw new ApiError(404, "Creator profile not found");
    }
    chats = await Chat.find({
      creatorId: creator._id,
      isActive: true,
    })
      .populate({
        path: "brandId",
        select: "companyName",
      })
      .populate({
        path: "campaignId",
        select: "title",
      })
      .sort({ lastMessageAt: -1 });
  }
  if (req.user.role === "brand") {
    const brand = await Brand.findOne({
      userId: req.user._id,
    });
    if (!brand) {
      throw new ApiError(404, "Brand profile not found");
    }
    chats = await Chat.find({
      brandId: "creatorId",
      isAcctive: true,
    })
      .populate({
        path: "creatorId",
        select: "name username email",
      })
      .populate({
        path: "campaignId",
        select: "title",
      })
      .sort({ lastMessageAt: -1 });
  }
  return res
    .status(200)
    .json(new ApiResponse(200, chats, "Chats fetched successfully"));
});

const getChatMessages = asyncHandler(async (req, res) => {
  const { chatId } = req.params;

  // Validate chat id
  if (!mongoose.Types.ObjectId.isValid(chatId)) {
    throw new ApiError(400, "Invalid chat id");
  }

  // Find chat
  const chat = await Chat.findById(chatId);

  if (!chat) {
    throw new ApiError(404, "Chat not found");
  }

  // Authorization
  if (req.user.role === "creator") {
    const creator = await Creator.findOne({
      userId: req.user._id,
    });

    if (!creator) {
      throw new ApiError(404, "Creator profile not found");
    }

    if (!chat.creatorId.equals(creator._id)) {
      throw new ApiError(403, "You are not authorized to access this chat");
    }
  }

  if (req.user.role === "brand") {
    const brand = await Brand.findOne({
      userId: req.user._id,
    });

    if (!brand) {
      throw new ApiError(404, "Brand profile not found");
    }

    if (!chat.brandId.equals(brand._id)) {
      throw new ApiError(403, "You are not authorized to access this chat");
    }
  }

  // Fetch messages
  const messages = await Message.find({
    chatId: chat._id,
  })
    .populate({
      path: "senderId",
      select: "username email role",
    })
    .sort({ createdAt: 1 });

  return res
    .status(200)
    .json(new ApiResponse(200, messages, "Messages fetched successfully"));
});

const sendMessage = asyncHandler(async (req, res) => {
  // validate
  const { chatId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(chatId)) {
    throw new ApiError(400, "Invalid chat id");
  }
  // message
  const { text } = req.body;
  if (!text?.trim()) {
    throw new ApiError(400, "Message is required");
  }
  // find chat
  const chat = await Chat.findById(chatId);
  if (!chat) {
    throw new ApiError(404, "chat not found");
  }

  // authorisation
  if (req.user.role === "creator") {
    const creator = await Creator.findOne({
      userId: req.user._id,
    });

    if (!creator) {
      throw new ApiError(404, "Creator profile not found");
    }

    if (!chat.creatorId.equals(creator._id)) {
      throw new ApiError(403, "You are not authorized to access this chat");
    }
  }

  if (req.user.role === "brand") {
    const brand = await Brand.findOne({
      userId: req.user._id,
    });

    if (!brand) {
      throw new ApiError(404, "Brand profile not found");
    }

    if (!chat.brandId.equals(brand._id)) {
      throw new ApiError(403, "You are not authorized to access this chat");
    }
  }
  // start transaction
  let message;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // create message
    [message] = await Message.create(
      [
        {
          chatId: chat._id,
          senderId: req.user._id,
          text: text.trim(),
        },
      ],
      { session },
    );
    // update Chat
    chat.lastMessage = message.text;
    chat.lastMessageAt = message.createdAt;

    await chat.save({ session });
    await session.commitTransaction();
    const io = getIO();
    io.to(chatId.toString()).emit("receive-message", {
      message,
    });
  } catch (error) {
    // roll back
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }

  //response
  let recipientId;
  // if creator is sender
  if (req.user.role === "creator") {
    const brand = await Brand.findById(chat.brandId);
    recipientId = brand.userId;
  }

  // if brand is sender
  if (req.user.role === "brand") {
    const creator = await Creator.findById(chat.creatorId);
    recipientId = creator.userId;
  }
  // create notification
  await Notification.create({
    recipientId,
    senderId: req.user._id,
    type: "new_message",
    title: "New Message",
    message: text.trim(),
    referenceId: chat.id,
    referenceModel: "Chat",
  });
  return res
    .status(201)
    .json(new ApiResponse(201, message, "Message sent successfully"));
});
export { getMyChats, getChatMessages, sendMessage };

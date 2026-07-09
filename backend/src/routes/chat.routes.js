import { Router } from "express";
const router = Router();
import {
  getChatMessages,
  getMyChats,
  sendMessage,
} from "../controller/chat_controller.js";
import { verifyJWT } from "../middleware/auth_middleware.js";
router.route("/getMyChat").get(verifyJWT, getMyChats);
router.route("/:chatId/getChatMessages").get(verifyJWT, getChatMessages);
router.route("/sendMessage/:chatId").post(verifyJWT, sendMessage);

export { router as chatRouter };

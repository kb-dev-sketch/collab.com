import { Router } from "express";
const router = Router();
import { verifyJWT } from "../middleware/auth_middleware.js";

import {
  deleteNotification,
  getNotifications,
  getUnreadNotificationCount,
  markAllNotificationsAsRead,
  markNotificationAsRead,
} from "../controller/notification_controller.js";
router.use(verifyJWT);
router.route("/getNotification").get(getNotifications);
router.route("/Unread-Count").get(getUnreadNotificationCount);
router.route("/:notificationId/read").patch(markNotificationAsRead);
router.route("/read-all").patch(markAllNotificationsAsRead);
router.route("/delete/:notificationId").delete(deleteNotification);

export { router as notificationRouter };

import mongoose from "mongoose";
import { Notification } from "../model/notification.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const getNotifications = asyncHandler(async (req, res) => {
  // step 1:Pagination
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.max(1, Number(req.query.limit) || 20);
  const skip = (page - 1) * limit;
  // step 2:Fetch notification
  const notification = await Notification.find({
    recipientId: req.user._id,
  })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate("senderId", "username email");
  // step :3 total count
  const totalNotification = await Notification.countDocuments({
    recipientId: req.user._id,
  });
  // step 4:response
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        notification,
        currentPage: page,
        totalPages: Math.ceil(totalNotification / limit),
        totalNotification,
      },
      "Notifications fetched successfully",
    ),
  );
});

const getUnreadNotificationCount = asyncHandler(async (req, res) => {
  const unreadCount = await Notification.countDocuments({
    recipientId: req.user._id,
    isRead: false,
  });
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { unreadCount },
        "Unread notification count fetched successfully",
      ),
    );
});
const markNotificationAsRead = asyncHandler(async (req, res) => {
  const { notificationId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(notificationId)) {
    throw new ApiError(400, "Invalid notification id");
  }
  // find notification
  const notification = await Notification.findById(notificationId);
  // exist check
  if (!notification) {
    throw new ApiError(404, "Notification not found");
  }

  // ownership check
  if (!notification.recipientId.equals(req.user._id)) {
    throw new ApiError(403, "Unauthorised");
  }
  // already used
  if (notification.isRead) {
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          notification,
          "Notification already marked as read",
        ),
      );
  }
  // update
  notification.isRead = true;
  await notification.save();
  // return response
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        notification,
        "Notification marked as read successfully",
      ),
    );
});

const markAllNotificationsAsRead = asyncHandler(async (req, res) => {
  await Notification.updateMany(
    {
      recipientId: req.user._id,
      isRead: false,
    },
    {
      $set: {
        isRead: true,
      },
    },
  );
  return res
    .status(200)
    .json(
      new ApiResponse(200, {}, "All notifications marked as read successfully"),
    );
});

const deleteNotification = asyncHandler(async (req, res) => {
  const { notificationId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(notificationId)) {
    throw new ApiError(400, "Invalid notification id");
  }

  const notification = await Notification.findById(notificationId);
  if (!notification) {
    throw new ApiError(404, "Notification not found");
  }
  if (!notification.recipientId.equals(req.user._id)) {
    throw new ApiError(
      403,
      "you are not authorised to delete this notification",
    );
  }
  await notification.deleteOne();
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Notification deleted successfully"));
});
export {
  getNotifications,
  getUnreadNotificationCount,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
};

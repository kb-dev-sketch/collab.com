import mongoose from "mongoose";
import { Notification } from "../model/notification.model";
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

export { getNotifications };

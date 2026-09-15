import API from "./api";

// Get all notifications
export const getNotifications = async (page = 1, limit = 20) => {
  const response = await API.get(
    `/notification/getNotification?page=${page}&limit=${limit}`,
  );

  return response.data;
};

// Get unread notification count
export const getUnreadNotificationCount = async () => {
  const response = await API.get("/notification/Unread-Count");

  return response.data;
};

// Mark one notification as read
export const markNotificationAsRead = async (notificationId) => {
  const response = await API.patch(`/notification/${notificationId}/read`);

  return response.data;
};

// Mark all notifications as read
export const markAllNotificationsAsRead = async () => {
  const response = await API.patch("/notification/read-all");

  return response.data;
};

// Delete notification
export const deleteNotification = async (notificationId) => {
  const response = await API.delete(`/notification/delete/${notificationId}`);

  return response.data;
};

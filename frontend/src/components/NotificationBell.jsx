import { useEffect, useRef, useState } from "react";
import { FiBell, FiCheck, FiTrash2 } from "react-icons/fi";

import {
  getNotifications,
  getUnreadNotificationCount,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
} from "../services/notification";

function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const dropdownRef = useRef(null);

  // Fetch unread count
  const fetchUnreadCount = async () => {
    try {
      const response = await getUnreadNotificationCount();

      setUnreadCount(response.data?.unreadCount || 0);
    } catch (error) {
      console.error("Error fetching unread count:", error);
    }
  };

  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      setLoading(true);

      const response = await getNotifications(1, 20);

      setNotifications(response.data?.notification || []);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUnreadCount();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);

    if (!isOpen) {
      fetchNotifications();
    }
  };

  // Mark one notification as read
  const handleRead = async (notificationId) => {
    try {
      await markNotificationAsRead(notificationId);

      setNotifications((prev) =>
        prev.map((notification) =>
          notification._id === notificationId
            ? { ...notification, isRead: true }
            : notification
        )
      );

      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  // Mark all as read
  const handleMarkAllRead = async () => {
    try {
      await markAllNotificationsAsRead();

      setNotifications((prev) =>
        prev.map((notification) => ({
          ...notification,
          isRead: true,
        }))
      );

      setUnreadCount(0);
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
    }
  };

  // Delete notification
  const handleDelete = async (notificationId) => {
    try {
      await deleteNotification(notificationId);

      const deletedNotification = notifications.find(
        (notification) => notification._id === notificationId
      );

      setNotifications((prev) =>
        prev.filter(
          (notification) => notification._id !== notificationId
        )
      );

      if (deletedNotification && !deletedNotification.isRead) {
        setUnreadCount((prev) => Math.max(0, prev - 1));
      }
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Button */}
      <button
        type="button"
        onClick={handleToggle}
        className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-blue-100 bg-white text-slate-600 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
      >
        <FiBell size={20} />

        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white ring-2 ring-white">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 z-50 mt-3 w-[360px] overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-2xl shadow-blue-100/40">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <div>
              <h3 className="font-bold text-slate-900">
                Notifications
              </h3>

              <p className="mt-1 text-xs text-slate-400">
                {unreadCount} unread notification
                {unreadCount !== 1 ? "s" : ""}
              </p>
            </div>

            {unreadCount > 0 && (
              <button
                type="button"
                onClick={handleMarkAllRead}
                className="text-xs font-semibold text-blue-600 transition hover:text-blue-700"
              >
                Mark all read
              </button>
            )}
          </div>

          {/* Notifications */}
          <div className="max-h-[420px] overflow-y-auto">
            {loading ? (
              <div className="px-5 py-10 text-center text-sm text-slate-400">
                Loading notifications...
              </div>
            ) : notifications.length === 0 ? (
              <div className="px-5 py-10 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <FiBell size={20} />
                </div>

                <p className="mt-3 font-semibold text-slate-700">
                  No notifications
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  You're all caught up.
                </p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification._id}
                  className={`group border-b border-slate-100 px-5 py-4 transition ${
                    notification.isRead
                      ? "bg-white"
                      : "bg-blue-50/60"
                  }`}
                >
                  <div className="flex gap-3">
                    <div
                      className={`mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                        notification.isRead
                          ? "bg-slate-100 text-slate-500"
                          : "bg-blue-600 text-white"
                      }`}
                    >
                      <FiBell size={16} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-slate-800">
                            {notification.title}
                          </p>

                          <p className="mt-1 text-sm leading-5 text-slate-500">
                            {notification.message}
                          </p>
                        </div>

                        {!notification.isRead && (
                          <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-600" />
                        )}
                      </div>

                      <div className="mt-3 flex items-center gap-3">
                        {!notification.isRead && (
                          <button
                            type="button"
                            onClick={() =>
                              handleRead(notification._id)
                            }
                            className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700"
                          >
                            <FiCheck size={13} />
                            Mark as read
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(notification._id)
                          }
                          className="inline-flex items-center gap-1 text-xs font-semibold text-red-500 opacity-0 transition group-hover:opacity-100 hover:text-red-600"
                        >
                          <FiTrash2 size={13} />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default NotificationBell;
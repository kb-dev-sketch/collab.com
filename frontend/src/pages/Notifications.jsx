import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Loader from "../components/Loader";

import {
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
} from "../services/notification";

import {
  FiBell,
  FiCheck,
  FiTrash2,
  FiArrowLeft,
  FiInbox,
} from "react-icons/fi";

function Notifications() {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ================= FETCH NOTIFICATIONS =================
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getNotifications(1, 20);

        setNotifications(response.data?.notification || []);
      } catch (error) {
        console.error("Error fetching notifications:", error);

        setError(
          error.response?.data?.message ||
            "Failed to load notifications."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  // ================= COUNTS =================
  const unreadCount = notifications.filter(
    (notification) => !notification.isRead
  ).length;

  // ================= MARK ONE AS READ =================
  const handleMarkAsRead = async (notificationId) => {
    try {
      await markNotificationAsRead(notificationId);

      setNotifications((prev) =>
        prev.map((notification) =>
          notification._id === notificationId
            ? { ...notification, isRead: true }
            : notification
        )
      );
    } catch (error) {
      console.error(
        "Error marking notification as read:",
        error
      );
    }
  };

  // ================= MARK ALL AS READ =================
  const handleMarkAllRead = async () => {
    try {
      await markAllNotificationsAsRead();

      setNotifications((prev) =>
        prev.map((notification) => ({
          ...notification,
          isRead: true,
        }))
      );
    } catch (error) {
      console.error(
        "Error marking all notifications as read:",
        error
      );
    }
  };

  // ================= DELETE =================
  const handleDelete = async (notificationId) => {
    try {
      await deleteNotification(notificationId);

      setNotifications((prev) =>
        prev.filter(
          (notification) =>
            notification._id !== notificationId
        )
      );
    } catch (error) {
      console.error(
        "Error deleting notification:",
        error
      );
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50">
      {/* ================= SIDEBAR ================= */}
      <Sidebar />

      {/* ================= MAIN ================= */}
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-6xl p-5 sm:p-6 lg:p-10">

          {/* ================= HEADER ================= */}
          <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 p-6 text-white shadow-xl shadow-blue-600/20 sm:p-8 lg:p-10">
            
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

            <div className="relative">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="mb-6 inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-blue-50 backdrop-blur-sm transition hover:bg-white/20"
              >
                <FiArrowLeft size={16} />
                Back
              </button>

              <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-blue-100">
                    <FiBell size={14} />
                    Activity Center
                  </div>

                  <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                    Notifications
                  </h1>

                  <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-100 sm:text-base">
                    Stay updated on proposals, campaigns,
                    messages, and important activity.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/20 bg-white/10 px-6 py-4 text-center backdrop-blur-md">
                  <p className="text-xs font-medium text-blue-100">
                    Unread
                  </p>

                  <p className="mt-1 text-3xl font-bold">
                    {unreadCount}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ================= ERROR ================= */}
          {error && (
            <div className="mt-6 rounded-2xl border border-red-100 bg-red-50 p-5">
              <p className="text-sm font-medium text-red-600">
                {error}
              </p>
            </div>
          )}

          {/* ================= CONTENT ================= */}
          <section className="mt-8">
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                  Recent Activity
                </p>

                <h2 className="mt-1 text-2xl font-bold text-slate-900">
                  Your Notifications
                </h2>
              </div>

              {unreadCount > 0 && (
                <button
                  type="button"
                  onClick={handleMarkAllRead}
                  className="inline-flex w-fit items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition hover:bg-blue-700"
                >
                  <FiCheck size={16} />
                  Mark all as read
                </button>
              )}
            </div>

            {/* ================= EMPTY STATE ================= */}
            {notifications.length === 0 ? (
              <div className="rounded-3xl border border-blue-100 bg-white px-6 py-16 text-center shadow-sm">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                  <FiInbox size={28} />
                </div>

                <h3 className="mt-5 text-xl font-bold text-slate-900">
                  You're all caught up
                </h3>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                  There are no notifications to show right now.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <article
                    key={notification._id}
                    className={`group rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-md ${
                      notification.isRead
                        ? "border-slate-200"
                        : "border-blue-200 bg-blue-50/30"
                    }`}
                  >
                    <div className="flex gap-4">
                      {/* ICON */}
                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                          notification.isRead
                            ? "bg-slate-100 text-slate-500"
                            : "bg-blue-600 text-white"
                        }`}
                      >
                        <FiBell size={20} />
                      </div>

                      {/* CONTENT */}
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-bold text-slate-900">
                                {notification.title}
                              </h3>

                              {!notification.isRead && (
                                <span className="h-2 w-2 rounded-full bg-blue-600" />
                              )}
                            </div>

                            <p className="mt-2 text-sm leading-6 text-slate-600">
                              {notification.message}
                            </p>
                          </div>
                        </div>

                        {/* ACTIONS */}
                        <div className="mt-4 flex flex-wrap items-center gap-4">
                          {!notification.isRead && (
                            <button
                              type="button"
                              onClick={() =>
                                handleMarkAsRead(
                                  notification._id
                                )
                              }
                              className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 transition hover:text-blue-700"
                            >
                              <FiCheck size={14} />
                              Mark as read
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() =>
                              handleDelete(
                                notification._id
                              )
                            }
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-500 transition hover:text-red-600"
                          >
                            <FiTrash2 size={14} />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

export default Notifications;
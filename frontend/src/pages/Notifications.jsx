import { useEffect, useMemo, useState } from "react";
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
  FiMessageSquare,
  FiBriefcase,
  FiFileText,
  FiCheckCircle,
  FiClock,
} from "react-icons/fi";

function Notifications() {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [activeFilter, setActiveFilter] = useState("all");

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

  const readCount = notifications.length - unreadCount;

  // ================= FILTER =================

  const filteredNotifications = useMemo(() => {
    if (activeFilter === "unread") {
      return notifications.filter((notification) => !notification.isRead);
    }

    return notifications;
  }, [notifications, activeFilter]);

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
      console.error("Error marking notification as read:", error);
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
      console.error("Error marking all notifications as read:", error);
    }
  };

  // ================= DELETE =================

  const handleDelete = async (notificationId) => {
    try {
      await deleteNotification(notificationId);

      setNotifications((prev) =>
        prev.filter(
          (notification) => notification._id !== notificationId
        )
      );
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  // ================= HELPERS =================

  const getNotificationMeta = (notification) => {
    const type = notification.referenceModel?.toLowerCase();

    if (type === "chat") {
      return {
        icon: <FiMessageSquare size={18} />,
        label: "Message",
        iconClass: "bg-violet-50 text-violet-600",
        accent: "border-violet-200",
      };
    }

    if (type === "campaign") {
      return {
        icon: <FiBriefcase size={18} />,
        label: "Campaign",
        iconClass: "bg-blue-50 text-blue-600",
        accent: "border-blue-200",
      };
    }

    if (type === "proposal") {
      return {
        icon: <FiFileText size={18} />,
        label: "Proposal",
        iconClass: "bg-emerald-50 text-emerald-600",
        accent: "border-emerald-200",
      };
    }

    return {
      icon: <FiBell size={18} />,
      label: "Activity",
      iconClass: "bg-slate-100 text-slate-600",
      accent: "border-slate-200",
    };
  };

  const formatTime = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // ================= LOADING =================

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <main className="min-w-0 flex-1 pt-16 lg:pt-0">
        <div className="mx-auto max-w-5xl px-4 py-5 sm:px-6 sm:py-7 lg:px-8 lg:py-10">

          {/* ================= TOP BAR ================= */}

          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
              >
                <FiArrowLeft size={17} />
              </button>

              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
                  Activity Center
                </p>

                <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  Notifications
                </h1>
              </div>
            </div>

            {unreadCount > 0 && (
              <button
                type="button"
                onClick={handleMarkAllRead}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 sm:w-fit sm:py-2.5"
              >
                <FiCheck size={16} />
                Mark all as read
              </button>
            )}
          </div>

          {/* ================= SUMMARY ================= */}

          <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-600 to-indigo-700 p-6 text-white sm:p-8">
              <div className="absolute -right-16 -top-20 h-52 w-52 rounded-full bg-white/10 blur-2xl" />

              <div className="absolute -bottom-24 left-1/3 h-48 w-48 rounded-full bg-blue-300/10 blur-3xl" />

              <div className="relative">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm">
                    <FiBell size={22} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-medium text-blue-100">
                      Stay in the loop
                    </p>

                    <h2 className="mt-1 text-xl font-bold sm:text-2xl">
                      Everything important, in one place.
                    </h2>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-blue-100">
                      Keep track of proposals, campaigns, messages and other
                      activity across CollabConnect.
                    </p>
                  </div>
                </div>

                {/* Stats */}
                <div className="mt-6 grid grid-cols-2 gap-3 sm:max-w-md">
                  <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
                    <p className="text-xs text-blue-100">Unread</p>
                    <p className="mt-1 text-2xl font-bold">
                      {unreadCount}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
                    <p className="text-xs text-blue-100">Read</p>
                    <p className="mt-1 text-2xl font-bold">
                      {readCount}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ================= ERROR ================= */}

          {error && (
            <div className="mt-6 rounded-2xl border border-red-100 bg-red-50 p-4">
              <p className="text-sm font-medium text-red-600">
                {error}
              </p>
            </div>
          )}

          {/* ================= FILTER BAR ================= */}

          <section className="mt-7">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                  Recent activity
                </p>

                <h2 className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl">
                  Your updates
                </h2>
              </div>

              <div className="flex w-full rounded-xl border border-slate-200 bg-white p-1 shadow-sm sm:w-fit">
                <button
                  type="button"
                  onClick={() => setActiveFilter("all")}
                  className={`flex-1 rounded-lg px-4 py-2 text-sm font-semibold transition sm:flex-none ${
                    activeFilter === "all"
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-slate-500 hover:bg-slate-50"
                  }`}
                >
                  All
                </button>

                <button
                  type="button"
                  onClick={() => setActiveFilter("unread")}
                  className={`flex-1 rounded-lg px-4 py-2 text-sm font-semibold transition sm:flex-none ${
                    activeFilter === "unread"
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-slate-500 hover:bg-slate-50"
                  }`}
                >
                  Unread
                  {unreadCount > 0 && (
                    <span
                      className={`ml-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] ${
                        activeFilter === "unread"
                          ? "bg-white text-blue-600"
                          : "bg-blue-50 text-blue-600"
                      }`}
                    >
                      {unreadCount}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </section>

          {/* ================= EMPTY ================= */}

          {filteredNotifications.length === 0 ? (
            <div className="mt-6 rounded-3xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <FiInbox size={28} />
              </div>

              <h3 className="mt-5 text-xl font-bold text-slate-900">
                {activeFilter === "unread"
                  ? "You're all caught up"
                  : "No notifications yet"}
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                {activeFilter === "unread"
                  ? "There are no unread notifications waiting for you."
                  : "Important activity from your collaborations will appear here."}
              </p>
            </div>
          ) : (
            <div className="mt-6 space-y-3">

              {filteredNotifications.map((notification) => {
                const meta = getNotificationMeta(notification);

                return (
                  <article
                    key={notification._id}
                    className={`group relative overflow-hidden rounded-2xl border bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-5 ${
                      notification.isRead
                        ? "border-slate-200"
                        : `${meta.accent} bg-blue-50/30`
                    }`}
                  >
                    {/* unread indicator */}
                    {!notification.isRead && (
                      <div className="absolute bottom-0 left-0 top-0 w-1 bg-blue-600" />
                    )}

                    <div className="flex items-start gap-3 sm:gap-4">

                      {/* icon */}
                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${meta.iconClass}`}
                      >
                        {meta.icon}
                      </div>

                      {/* content */}
                      <div className="min-w-0 flex-1">

                        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-500">
                                {meta.label}
                              </span>

                              {!notification.isRead && (
                                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-blue-600">
                                  <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                                  New
                                </span>
                              )}
                            </div>

                            <h3 className="mt-2 break-words text-sm font-bold text-slate-900 sm:text-base">
                              {notification.title}
                            </h3>
                          </div>

                          <div className="flex shrink-0 items-center gap-1.5 text-xs text-slate-400">
                            <FiClock size={13} />
                            {formatTime(notification.createdAt)}
                          </div>
                        </div>

                        <p className="mt-2 break-words text-sm leading-6 text-slate-600">
                          {notification.message}
                        </p>

                        {/* Actions */}
                        <div className="mt-4 flex flex-wrap items-center gap-2">
                          {!notification.isRead && (
                            <button
                              type="button"
                              onClick={() =>
                                handleMarkAsRead(notification._id)
                              }
                              className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-600 transition hover:bg-blue-100"
                            >
                              <FiCheck size={14} />
                              Mark as read
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() =>
                              handleDelete(notification._id)
                            }
                            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-slate-400 transition hover:bg-red-50 hover:text-red-500"
                          >
                            <FiTrash2 size={14} />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {/* Bottom spacing */}
          <div className="h-6 sm:h-8" />
        </div>
      </main>
    </div>
  );
}

export default Notifications;
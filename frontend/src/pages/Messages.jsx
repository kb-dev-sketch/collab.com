import { useEffect, useState } from "react";
import {
  FiMessageSquare,
  FiSend,
  FiSearch,
  FiArrowLeft,
} from "react-icons/fi";

import Sidebar from "../components/Sidebar";
import Loader from "../components/Loader";

import {
  getMyChats,
  getChatMessages,
  sendMessage,
} from "../services/chat";

function Messages() {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");

  const [loading, setLoading] = useState(true);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [sending, setSending] = useState(false);

  const [search, setSearch] = useState("");

  // ================= GET CHATS =================
  useEffect(() => {
    const fetchChats = async () => {
      try {
        setLoading(true);

        const response = await getMyChats();

        console.log("My chats:", response);

        setChats(response.data || []);
      } catch (error) {
        console.error(
          "Error fetching chats:",
          error.response?.data || error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, []);

  // ================= OPEN CHAT =================
  const handleSelectChat = async (chat) => {
    try {
      setSelectedChat(chat);
      setMessagesLoading(true);

      const response = await getChatMessages(chat._id);

      console.log("Chat messages:", response);

      setMessages(response.data || []);
    } catch (error) {
      console.error(
        "Error fetching messages:",
        error.response?.data || error
      );
    } finally {
      setMessagesLoading(false);
    }
  };

  // ================= SEND MESSAGE =================
  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!messageText.trim() || !selectedChat) {
      return;
    }

    try {
      setSending(true);

      const response = await sendMessage(selectedChat._id, {
        text: messageText.trim(),
        
      });

      console.log("Sent message:", response);

      const newMessage = response.data;

      setMessages((prev) => [...prev, newMessage]);
      setMessageText("");
    } catch (error) {
      console.error(
        "Error sending message:",
        error.response?.data || error
      );
    } finally {
      setSending(false);
    }
  };

  // ================= FILTER CHATS =================
  const filteredChats = chats.filter((chat) => {
    const searchText = search.toLowerCase();

    const name =
      chat?.creatorId?.name ||
      chat?.brandId?.companyName ||
      "";

    return name.toLowerCase().includes(searchText);
  });

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* ================= SIDEBAR ================= */}
      <Sidebar />

      {/* ================= MESSAGES ================= */}
      <main className="flex-1 p-5 sm:p-6 lg:p-8">
        <div className="mx-auto flex h-[calc(100vh-64px)] max-w-7xl overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-xl shadow-blue-100/20">

          {/* ================= CHAT LIST ================= */}
          <aside
            className={`w-full border-r border-slate-200 md:w-[340px] ${
              selectedChat ? "hidden md:block" : "block"
            }`}
          >
            {/* Header */}
            <div className="border-b border-slate-100 p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
                  <FiMessageSquare size={21} />
                </div>

                <div>
                  <h1 className="text-xl font-bold text-slate-900">
                    Messages
                  </h1>

                  <p className="text-xs text-slate-400">
                    Your conversations
                  </p>
                </div>
              </div>

              {/* Search */}
              <div className="relative mt-5">
                <FiSearch
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  size={17}
                />

                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-blue-400 focus:bg-white"
                />
              </div>
            </div>

            {/* Chat List */}
            <div className="h-[calc(100%-145px)] overflow-y-auto">
              {filteredChats.length === 0 ? (
                <div className="px-5 py-12 text-center">
                  <FiMessageSquare
                    size={30}
                    className="mx-auto text-slate-300"
                  />

                  <p className="mt-3 font-semibold text-slate-600">
                    No conversations
                  </p>
                </div>
              ) : (
                filteredChats.map((chat) => {
                  const name =
                    chat?.creatorId?.name ||
                    chat?.brandId?.companyName ||
                    "Conversation";

                  const image =
                    chat?.creatorId?.profileImage ||
                    chat?.brandId?.logo ||
                    "";

                  return (
                    <button
                      key={chat._id}
                      type="button"
                      onClick={() => handleSelectChat(chat)}
                      className={`w-full border-b border-slate-100 px-5 py-4 text-left transition hover:bg-blue-50/50 ${
                        selectedChat?._id === chat._id
                          ? "bg-blue-50"
                          : "bg-white"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {image ? (
                          <img
                            src={image}
                            alt={name}
                            className="h-12 w-12 rounded-full object-cover"
                          />
                        ) : (
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                            {name
                              .charAt(0)
                              .toUpperCase()}
                          </div>
                        )}

                        <div className="min-w-0 flex-1">
                          <p className="truncate font-semibold text-slate-800">
                            {name}
                          </p>

                          <p className="mt-1 truncate text-xs text-slate-400">
                            {chat?.lastMessage ||
                              "Start a conversation"}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </aside>

          {/* ================= CHAT WINDOW ================= */}
          <section
            className={`flex flex-1 flex-col ${
              selectedChat ? "flex" : "hidden md:flex"
            }`}
          >
            {!selectedChat ? (
              <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-50 text-blue-600">
                  <FiMessageSquare size={34} />
                </div>

                <h2 className="mt-5 text-2xl font-bold text-slate-900">
                  Your Messages
                </h2>

                <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                  Select a conversation from the left to start
                  chatting with a creator or brand.
                </p>
              </div>
            ) : (
              <>
                {/* Chat Header */}
                <div className="flex items-center gap-3 border-b border-slate-200 px-5 py-4">
                  <button
                    type="button"
                    onClick={() => setSelectedChat(null)}
                    className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 md:hidden"
                  >
                    <FiArrowLeft size={19} />
                  </button>

                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                    {(selectedChat?.creatorId?.name ||
                      selectedChat?.brandId?.companyName ||
                      "C"
                    )
                      .charAt(0)
                      .toUpperCase()}
                  </div>

                  <div>
                    <h2 className="font-bold text-slate-900">
                      {selectedChat?.creatorId?.name ||
                        selectedChat?.brandId?.companyName ||
                        "Conversation"}
                    </h2>

                    <p className="text-xs text-blue-600">
                      Active conversation
                    </p>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 space-y-4 overflow-y-auto bg-slate-50/60 p-5">
                  {messagesLoading ? (
                    <div className="flex h-full items-center justify-center">
                      <p className="text-sm text-slate-400">
                        Loading messages...
                      </p>
                    </div>
                  ) : messages.length === 0 ? (
                    <div className="flex h-full items-center justify-center">
                      <p className="text-sm text-slate-400">
                        No messages yet. Start the conversation.
                      </p>
                    </div>
                  ) : (
                    messages.map((message) => {
                      return (
                        <div
                          key={message._id}
                          className="flex justify-end"
                        >
                          <div className="max-w-[75%] rounded-2xl rounded-br-md bg-blue-600 px-4 py-3 text-white shadow-sm">
                            <p className="text-sm leading-6">
                              {message.text}
                            </p>

                            <p className="mt-1 text-right text-[10px] text-blue-100">
                              {message.createdAt
                                ? new Date(
                                    message.createdAt
                                  ).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })
                                : ""}
                            </p>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Input */}
                <form
                  onSubmit={handleSendMessage}
                  className="flex items-center gap-3 border-t border-slate-200 bg-white p-4"
                >
                  <input
                    type="text"
                    value={messageText}
                    onChange={(e) =>
                      setMessageText(e.target.value)
                    }
                    placeholder="Type a message..."
                    className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-400 focus:bg-white"
                  />

                  <button
                    type="submit"
                    disabled={sending || !messageText.trim()}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <FiSend size={18} />
                  </button>
                </form>
              </>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

export default Messages;
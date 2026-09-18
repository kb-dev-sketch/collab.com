import API from "./api";

// get all chats of logged in User
export const getMyChats = async () => {
  const response = await API.get("/chats/getMyChat");
  return response.data;
};

// get message of a specific chat

export const getChatMessages = async (chatId) => {
  const response = await API.get(`/chats/${chatId}/getChatMessages`);
  return response.data;
};

// send message to a specific chat
export const sendMessage = async (chatId, message) => {
  const response = await API.post(`/chats/sendMessage/${chatId}`, message);
  return response.data;
};

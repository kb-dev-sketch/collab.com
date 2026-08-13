import API from "./api";

// register User
export const registerUser = async (userData) => {
  const response = await API.post(`/auth/register`, userData);
  return response.data;
};

// Login User
export const loginUser = async (userData) => {
  const response = await API.post(`/auth/loginUser`, userData);
  return response.data;
};

// logout
export const logoutUser = async () => {
  const response = await API.post(`/auth/logoutUser`);
  return response.data;
};
// get current User

export const getCurrentUser = async () => {
  const response = await API.get(`/auth/getUser`);
  return response.data;
};

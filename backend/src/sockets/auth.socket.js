import jwt from "jsonwebtoken";
import { User } from "../model/user.model.js";

const socketAuth = async (socket, next) => {
  try {
    const token =
      socket.handshake.auth?.token || socket.handshake.headers?.accesstoken;
    if (!token) {
      return next(new Error("Unauthorised"));
    }
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decoded._id).select("-password");

    if (!user) {
      return next(new Error("User not found"));
    }

    socket.user = user;

    next();
  } catch (error) {
    next(new Error("Authentication failed"));
  }
};
export { socketAuth };

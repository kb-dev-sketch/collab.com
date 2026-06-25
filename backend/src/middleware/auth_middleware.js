import jwt from "jsonwebtoken";
import { User } from "../model/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
// res khali hai toh mai toh _ likh sakta hu
export const verifyJWT = asyncHandler(async (req, _, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header("authorization")?.replace("Bearer ", "");
  try {
    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select(
      "-password  -refreshToken",
    );
    if (!user) {
      throw new ApiError(401, "Invalid Access token");
    }
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});

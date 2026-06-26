import { ApiError } from "../utils/ApiError.js";
const verifyCreator = (req, res, next) => {
  if (!req.user) {
    throw new ApiError(401, "unauthorised request");
  }
  if (req.user.role !== "creator") {
    throw new ApiError(403, "only creator can access this resource");
  }
  next();
};
export { verifyCreator };

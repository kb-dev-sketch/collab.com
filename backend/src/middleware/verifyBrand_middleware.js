import { ApiError } from "../utils/ApiError.js";
const verifyBrand = (req, res, next) => {
  if (!req.user) {
    throw new ApiError(401, "unauthorised request");
  }
  if (req.user.role !== "brand") {
    throw new ApiError(403, "only brand can access this resource");
  }
  next();
};
export { verifyBrand };

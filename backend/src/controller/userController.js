import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

import { User } from "../model/user.model.js";

const registerUser = asyncHandler(async (req, res) => {
  //take the user detail
  const { email, username, password, role } = req.body;
  // validation
  if (!username || !email || password || role) {
    throw new ApiError(400, "all field are required");
  }
  // check existed user
  const existedUser = await User.findOne({
    $or: [{ username: username.toLowerCase() }, { email: email.toLowerCase() }],
  });
  if (existedUser) {
    throw new ApiError(409, "username or email already existed");
  }

  //create user
  const user = await User.create({
    username: username.toLowerCase(),
    email: email.toLowerCase(),
    password,
    role,
  });

  // remove sensitive information
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );

  if (!createdUser) {
    throw new ApiError(500, "something went wrong while registering user");
  }
  //response
  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "user rregistered successfully"));
});
export { registerUser };

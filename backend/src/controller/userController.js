import jwt from "jsonwebtoken";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../model/user.model.js";
const generateAccessAndRefreshTokens = async (userId) => {
  console.log("Debug userId", userId);
  console.log("type", typeof userId);
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      error?.message ||
        "something went wrong while generating refresh and access Token",
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  console.log("registerUser hit");
  //take the user detail
  const { email, username, password, role } = req.body;
  // validation
  if (!username || !email || !password || !role) {
    throw new ApiError(400, "all field are required");
  }
  // check existed user
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
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
    .json(new ApiResponse(201, createdUser, "user registered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!(username || email)) {
    throw new ApiError(404, "username or email is required");
  }
  const user = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (!user) {
    throw new ApiError(404, "user does not exist");
  }
  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(404, "invalid credentials");
  }
  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id,
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );

  // send to cookies
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged In SuccessFull",
      ),
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    },
  );
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out "));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookie.refreshToken || req.body.refreshToken;
  if (!incomingRefreshToken) {
    throw new ApiError(401, "unauthorised request ");
  }
  const decodedToken = jwt.verify(
    incomingRefreshToken,
    process.env.Refresh_Token_SECRET,
  );
  const user = await User.findById(decodedToken?._id);
  if (!user) {
    throw new ApiError(401, "Refresh token is Invalid expired or used");
  }
  const options = {
    httpOnly: true,
    secure: true,
  };
  const { accessToken, newRefreshToken } = await generateAccessAndRefreshTokens(
    user._id,
  );
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", newRefreshToken, options)
    .json(new ApiResponse(200, { accessToken, refreshToken: newRefreshToken }));
});
export { registerUser, loginUser, logoutUser, refreshAccessToken };

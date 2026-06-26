import { Creator } from "../model/creatorProfile.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const creatorProfile = asyncHandler(async (req, res) => {
  const {
    name,
    niches,
    profileImage,
    bio,
    city,
    language,
    socials,
    followers,
    engagementRate,
    pricePerPost,
    portfolioLinks,
  } = req.body;

  // Validation
  if (!name) {
    throw new ApiError(400, "Name is required");
  }
  // check profile already exists
  const existedProfile = await Creator.findOne({
    userId: req.user._id,
  });
  if (existedProfile) {
    throw new ApiError(400, "Creator Profile already existed");
  }
  // Create Profile
  const createCreator = await Creator.create({
    userId: req.user._id,
    name,
    bio,
    niches,
    city,
    language,
    socials,
    followers,
    profileImage,
    engagementRate,
    pricePerPost,
    portfolioLinks,
  });
  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        createCreator,
        "Creator profile created successfully",
      ),
    );
});

const update_creatorProfile = asyncHandler(async (req, res) => {
  const allowedFields = [
    name,
    niches,
    profileImage,
    bio,
    city,
    language,
    socials,
    followers,
    engagementRate,
    pricePerPost,
    portfolioLinks,
  ];
  // build update Object
  const updateData = {};
  allowedFields.forEachEach((field) => {
    if (req.body[field] !== undefined) {
      updateData[field] = req.body[field];
    }
  });
  // Nothing to update
  if (Object.keys(updateData).length === 0) {
    throw new ApiError(400, "no valid fields provided for updates");
  }
  const creator = await Creator.findOneAndUpdate(
    { userId: req.user._id },
    {
      $set: updateData,
    },
    {
      new: true,
      runvalidators: true,
    },
  );
  if (!creator) {
    throw new ApiError(404, "Creator profile not found");
  }
  return res
    .status(200)
    .json(
      new ApiResponse(200, creator, "Creator profile updated successfully"),
    );
});
const getCreatorProfile = asyncHandler(async (req, res) => {
  const creator = await Creator.findOne({
    userId: req.user._id,
  });
  if (!creator) {
    throw new ApiError(404, "Creator profile not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, creator, "Profile fetched successfully"));
});

const getCreatorById = asyncHandler(async (req, res) => {
  const { creatorId } = req.params;
  //validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(creatorId)) {
    throw new ApiError(400, "Invalid creator id");
  }
  // fetch creator profile
  const creator = await Creator.findById(creatorId).populate({
    path: "userId",
    select: "username ",
  });

  if (!creator) {
    throw new ApiError(404, "Creator not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, creator, "Creator fetched successfully"));
});
export {
  creatorProfile,
  update_creatorProfile,
  getCreatorProfile,
  getCreatorById,
};

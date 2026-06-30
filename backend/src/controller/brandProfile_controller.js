import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Brand } from "../model/brandProfile_model.js";

const createbrandProfile = asyncHandler(async (req, res) => {
  const {
    companyName,
    industry,
    Companysize,
    location,
    socials,
    website,
    desciption,
  } = req.body;
  if (!companyName || !socials || !location || !industry) {
    throw new ApiError(404, "all fields are required");
  }
  const existedProfile = await Brand.findOne({
    userId: req.user_id,
  });
  if (existedProfile) {
    throw new ApiError(404, "profile is already required");
  }

  const createBrand = await Brand.create({
    userId: req.user._id,
    companyName,
    industry,
    Companysize,
    location,
    socials,
    website,
    desciption,
  });
  return res
    .status(200)
    .json(
      new ApiResponse(200, createBrand, "brand profile created successfullt"),
    );
});
const updatebrandProfile = asyncHandler(async (req, res) => {
  const allowedFields = [
    companyName,
    industry,
    Companysize,
    location,
    socials,
    website,
    desciption,
  ];
  const updateData = {};
  allowedFields.forEach((fields) => {
    if (req.body[fields] !== undefined) {
      updateData[fields] = req.body[fields];
    }
  });
  // nothing to update
  if (Object.keys(updateData).length === 0) {
    throw new ApiError(400, "no valid field provided for update");
  }
  const brand = await Brand.findOneAndUpdate(
    {
      userId: req.user._id,
    },
    {
      $set: updateData,
    },
    {
      new: true,
      runValidators: true,
    },
  );
  if (!brand) {
    throw new ApiError(400, " brand profile not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, brand, "brand profile fetched successfully"));
});
const getbrandProfile = asyncHandler(async (req, res) => {
  console.log("CONTROLLER HIT");
  const brand = await Brand.findOne({
    userId: req.user._id,
  });
  if (!brand) {
    throw new ApiError(404, "Brand  profile is not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, brand, "profile fetched successfully"));
});
export { createbrandProfile, updatebrandProfile, getbrandProfile };

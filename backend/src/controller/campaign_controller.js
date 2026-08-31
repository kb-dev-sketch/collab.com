import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Brand } from "../model/brandProfile_model.js";
import { Campaign } from "../model/campaign_model.js";
import mongoose from "mongoose";
const createCampaign = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    niches,
    platforms,
    budget,
    requirements,
    deliverables,
    startDate,
    endDate,
    status,
  } = req.body;

  if (
    !title ||
    !description ||
    !niches ||
    !platforms ||
    !budget ||
    !requirements ||
    !deliverables ||
    !startDate ||
    !endDate ||
    !status
  ) {
    throw new ApiError(404, "all fields are required");
  }
  const brand = await Brand.findOne({
    userId: req.user._id,
  });
  if (!brand) {
    throw new ApiError(404, "Brand profile not found");
  }
  const campaign = await Campaign.create({
    brandId: brand._id,
    title,
    description,
    budget,
    niches,
    platforms,
    requirements,
    deliverables,
    startDate,
    endDate,
    status,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, campaign, "Campaign created successfully"));
});

const getallCampaign = asyncHandler(async (req, res) => {
  let campaigns;
  if (req.user.role == "brand") {
    const brand = await Brand.findOne({
      userId: req.user._id,
    });
    if (!brand) {
      throw new ApiError(404, "Brand Profile not found");
    }
    campaigns = await Campaign.find({
      brandId: brand._id,
      status: { $ne: "Cancelled" },
    })
      .populate({
        path: "brandId",
        select: "companyName website",
      })
      .sort({ createdAt: -1 });
  } else if (req.user.role === "creator") {
    campaigns = await Campaign.find({
      status: "Active",
    })
      .populate({
        path: "brandId",
        select: "companyName website",
      })
      .sort({ createdAt: -1 });
  } else {
    throw new ApiError(403, "unauthorised role");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, campaigns, "Campaigns fetched successfully"));
});
const getCampaignById = asyncHandler(async (req, res) => {
  const { campaignId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(campaignId)) {
    throw new ApiError(400, "Invalid campaign id");
  }

  const campaign = await Campaign.findById(campaignId).populate("brandId");
  if (!campaign) {
    throw new ApiError(404, "Campaign not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, campaign, "Campaign fetched successfully"));
});
const updateCampaign = asyncHandler(async (req, res) => {
  const { campaignId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(campaignId)) {
    throw new ApiError(400, "Invalid campaign id");
  }
  const campaign = await Campaign.findById(campaignId);

  if (!campaign) {
    throw new ApiError(404, "Campaign not found");
  }

  const brand = await Brand.findOne({
    userId: req.user._id,
  });
  // ownership check
  if (campaign.brandId.toString() != brand._id.toString()) {
    throw new ApiError(403, "You are not authorized to update this campaign");
  }
  // Allowed fields
  const allowedFields = [
    "title",
    "description",
    "niches",
    "platforms",
    "budget",
    "requirements",
    "deliverables",
    "startDate",
    "endDate",
    "status",
  ];
  allowedFields.forEach((fields) => {
    if (req.body[fields] !== undefined) {
      campaign[fields] = req.body[fields];
    }
  });
  await campaign.save();
  const updatedCampaign = await Campaign.findById(campaign._id).populate({
    path: "brandId",
    select: "companyName website email phoneNumber",
  });

  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedCampaign, "Campaign updated successfully"),
    );
});
const deleteCampaign = asyncHandler(async (req, res) => {
  const { campaignId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(campaignId)) {
    throw new ApiError(400, "Invalid campaign id");
  }
  const campaign = await Campaign.findById(campaignId);
  if (!campaign) {
    throw new ApiError(404, "Campaign not found");
  }
  const brand = await Brand.findOne({
    userId: req.user._id,
  });
  // ownership check
  if (campaign.brandId.toString() != brand._id.toString()) {
    throw new ApiError(403, "You are not authorized to delete this campaign");
  }

  // soft delete
  campaign.isActive = false;
  campaign.status = "Cancelled";
  await campaign.save();
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Campaign deleted successfully"));
});
export {
  createCampaign,
  getallCampaign,
  getCampaignById,
  updateCampaign,
  deleteCampaign,
};

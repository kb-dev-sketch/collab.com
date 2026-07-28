import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Proposal } from "../model/proposal.model.js";
import { Notification } from "../model/notification.model.js";
import mongoose from "mongoose";
import { Creator } from "../model/creatorProfile_model.js";
import { Campaign } from "../model/campaign_model.js";
import { Brand } from "../model/brandProfile_model.js";
import { Chat } from "../model/chat.model.js";

const createProposal = asyncHandler(async (req, res) => {
  const { campaignId, message, quotedPrice, deliveryDays } = req.body;

  if (!campaignId || !message || !quotedPrice || !deliveryDays) {
    throw new ApiError("All fields are required", 400);
  }
  if (!mongoose.Types.ObjectId.isValid(campaignId)) {
    throw new ApiError(400, "Invalid campaignId");
  }
  // logged-in creator
  const creator = await Creator.findOne({
    userId: req.user._id,
  });
  if (!creator) {
    throw new ApiError(404, "Creator profile not found");
  }
  const campaign = await Campaign.findById(campaignId);
  if (!campaign) {
    throw new ApiError(404, "Campaign not found");
  }
  //  business rules
  if (campaign.status !== "Active") {
    throw new ApiError(400, "this campaign is not longer accepting proposals");
  }

  const existingProposal = await Proposal.findOne({
    campaignId,
    creatorId: creator._id,
  });

  if (existingProposal) {
    throw new ApiError(409, "Proposal already exists for this campaign");
  }

  const newProposal = await Proposal.create({
    campaignId,
    creatorId: creator._id,
    brandId: campaign.brandId,
    message,
    quotedPrice,
    deliveryDays,
  });

  const brand = await Brand.findById(campaign.brandId);
  if (!brand) {
    throw new ApiError(404, "Brand profile not found");
  }
  await Notification.create({
    recipientId: brand.userId,
    senderId: req.user._id,
    type: "proposal_received",
    title: "New Proposal Received",
    referenceId: newProposal_.id,
    referenceModal: "Proposal",
  });

  return res
    .status(201)
    .json(new ApiResponse(201, newProposal, "Proposal created successfully"));
});
const getProposalById = asyncHandler(async (req, res) => {
  const { proposalId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(proposalId)) {
    throw new ApiError("Invalid proposalId", 400);
  }
  const proposal = await Proposal.findById(proposalId)
    .populate({
      path: "campaignId",
      select: " title budget niches startDate endDate status",
    })
    .populate({
      path: "creatorId",
      select: "username email",
    })
    .populate({
      path: "brandId",
      select: "companyName email",
    });
  if (!proposal) {
    throw new ApiError("Proposal not found", 404);
  }
  // creator ownership check
  if (req.user.role === "creator") {
    const creator = await Creator.findOne({
      userId: req.user._id,
    });
    if (!creator || !proposal.creatorId.equals(creator._id)) {
      throw new ApiError("You are not authorized to view this proposal", 403);
    }
  }
  if (req.user.role === "brand") {
    const brand = await Brand.findOne({
      userId: req.user._id,
    });
    if (!brand || !proposal.brandId.equals(brand._id)) {
      throw new ApiError("You are not authorized to view this proposal", 403);
    }
  }
  return res
    .status(200)
    .json(new ApiResponse(200, proposal, "Proposal fetched successfully"));
});

const getProposalsByCampaign = asyncHandler(async (req, res) => {
  const { campaignId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(campaignId)) {
    throw new ApiError(400, "Invalid campaignId");
  }

  if (!proposals) {
    throw new ApiError(404, "No proposals found for this campaign");
  }
  // logged in brand
  const brand = await Brand.findOne({
    userId: req.user._id,
  });
  if (!brand) {
    throw new ApiError(403, "you are not authorise to view these proposals");
  }
  // campaign exists?
  const campaign = await Campaign.findById(campaignId);
  if (!campaign) {
    throw new ApiError(404, "Campaign not found");
  }
  // ownership check
  if (!campaign.brandId.equals(brand._id)) {
    throw new ApiError(403, "you are not authorise to view these proposals");
  }

  if (!brand || !proposals.brandId.equals(brand._id)) {
    throw new ApiError(403, "you are not authorise to view these proposals");
  }
  // FETCH ALL PROPOSALS FOR THIS CAMPAIGN
  const proposals = await Proposal.find({ campaignId, IsDeleted: false })
    .populate({
      path: "creatorId",
      select: "username email",
    })
    .sort({
      createdAt: -1,
    });
  return res
    .status(200)
    .json(new ApiResponse(200, proposals, "Proposals fetched successfully"));
});

const updateProposal = asyncHandler(async (req, res) => {
  const { proposalId } = req.params;
  const { message, quotedPrice, deliveryDays } = req.body;
  if (!mongoose.Types.ObjectId.isValid(proposalId)) {
    throw new ApiError(400, "invalid proposalId");
  }
  // creator
  const creator = await Creator.findOne({
    userId: req.user._id,
  });
  if (!creator) {
    throw new ApiError(403, "you are not authorized to update this proposal");
  }
  // proposal exists?
  const proposal = await Proposal.findById(proposalId);
  if (!proposal) {
    throw new ApiError(404, "Proposal not found");
  }
  // ownership check
  if (!proposal.creatorId.equals(creator._id)) {
    throw new ApiError(403, "You are not authorized to update this proposal");
  }
  // only pending proposal are allowed to update
  if (proposal.status !== "pending") {
    throw new ApiError(400, "only pending proposal can be updated");
  }
  if (message !== undefined) {
    proposal.message = message;
  }
  if (quotedPrice !== undefined) {
    proposal.quotedPrice = quotedPrice;
  }
  if (deliveryDays !== undefined) {
    proposal.deliveryDays = deliveryDays;
  }
  await proposal.save();
  return res
    .status(200)
    .json(new ApiResponse(200, proposal, "Proposal updated successfully"));
});

const acceptProposal = asyncHandler(async (req, res) => {
  const { proposalId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(proposalId)) {
    throw new ApiError(400, "invalid proposalId");
  }
  const proposal = await Proposal.findById(proposalId);
  if (!proposal) {
    throw new ApiError(404, "Proposal not found");
  }
  // logged in brand
  const brand = await Brand.findOne({
    userId: req.user._id,
  });
  if (!brand) {
    throw new ApiError(403, "Brand profile not found");
  }
  // ownership check
  const campaign = await Campaign.findById(proposal.campaignId);
  if (!campaign) {
    throw new ApiError(404, "Campaign not found");
  }
  if (!campaign.brandId.equals(brand._id)) {
    throw new ApiError(403, "You are not authorized to accept this proposal");
  }
  // status Check
  if (proposal.status !== "pending") {
    throw new ApiError(400, "only pending proposal can be accepted");
  }
  // check if chat already exist (Read operation)
  const existingChat = await Chat.findOne({
    proposalId: proposal._id,
  });
  // ---transaction ------
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    //accept proposal
    proposal.status = "accepted";
    await proposal.save({ session });
    // update campaign proposal
    campaign.status = "Active";
    await campaign.save({ session });
    // create chat if not exist
    console.log("proposal.brandId =", proposal.brandId);
    console.log("campaign.brandId =", campaign.brandId);
    console.log("proposal.creatorId =", proposal.creatorId);
    if (!existingChat) {
      await Chat.create(
        [
          {
            proposalId: proposal._id,
            campaignId: campaign._id,
            creatorId: proposal.creatorId,
            brandId: proposal.brandId,
          },
        ],

        { session },
      );
    }
    console.log({
      creatorId: proposal.creatorId,
      brandId: campaign.brandId,
    });
    await session.commitTransaction();
  } catch (error) {
    // ROLL back all changes
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
  // fetch updated proposal
  const updatedProposal = await Proposal.findById(proposal._id)
    .populate({
      path: "campaignId",
      select: "title budget status",
    })
    .populate({
      path: "creatorId",
      select: "name username",
    })
    .populate({
      path: "brandId",
      select: "companyName",
    });

  const creator = await Creator.findById(proposal.creatorId);

  if (!creator) {
    throw new ApiError(404, "Creator profile not found");
  }
  await Notification.create({
    recipientId: creator.userId,
    senderId: req.user._id,
    type: "proposal_accepted",
    title: "Proposal Accepted",
    message: "Your proposal has been accepted.",
    referenceId: proposal._id,
    referenceModel: "Proposal",
  });

  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedProposal, "Proposal accepted successfully"),
    );
});

export {
  createProposal,
  getProposalById,
  getProposalsByCampaign,
  updateProposal,
  acceptProposal,
};

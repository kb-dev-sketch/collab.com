import { Router } from "express";
const router = Router();
import { verifyJWT } from "../middleware/auth_middleware.js";
import { verifyCreator } from "../middleware/verifyCreator_middleware.js";
import { verifyBrand } from "../middleware/verifyBrand_middleware.js";
import {
  acceptProposal,
  createProposal,
  getProposalById,
  getProposalsByCampaign,
  updateProposal,
} from "../controller/proposal_controller.js";
router.route("/createProposal").post(verifyJWT, verifyCreator, createProposal);
router
  .route("/getproposal/:proposalId")
  .get(verifyJWT, verifyCreator, getProposalById);
router
  .route("/getproposalsBycampaign/:campaignId")
  .get(verifyJWT, verifyBrand, getProposalsByCampaign);
router
  .route("/updateProposal/:proposalId")
  .patch(verifyJWT, verifyCreator, updateProposal);
router
  .route("/acceptProposal/:proposalId")
  .post(verifyJWT, verifyBrand, acceptProposal);

export { router as proposalRoute };

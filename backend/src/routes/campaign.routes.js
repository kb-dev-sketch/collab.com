import { Router } from "express";
const router = Router();

import { verifyJWT } from "../middleware/auth_middleware.js";
import { verifyBrand } from "../middleware/verifyBrand_middleware.js";

import {
  createCampaign,
  deleteCampaign,
  getallCampaign,
  getCampaignById,
  updateCampaign,
} from "../controller/campaign_controller.js";
router.route("/createCampaign").post(verifyJWT, verifyBrand, createCampaign);
router.route("/getallCampaign").get(verifyJWT, getallCampaign);
router
  .route("/updateCampaign/:campaignId")
  .patch(verifyJWT, verifyBrand, updateCampaign);
router
  .route("/deleteCampaign/:campaignId")
  .delete(verifyJWT, verifyBrand, deleteCampaign);
router.route("/getCampaignById/:campaignId").get(verifyJWT, getCampaignById);

export { router as campaignRouter };

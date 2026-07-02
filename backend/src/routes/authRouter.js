import { Router } from "express";
import {
  loginUser,
  registerUser,
  logoutUser,
  refreshAccessToken,
  getCurrentUser,
} from "../controller/userController.js";
import { verifyJWT } from "../middleware/auth_middleware.js";
import {
  creatorProfile,
  getCreatorById,
  getCreatorProfile,
  update_creatorProfile,
} from "../controller/creatorProfile_controller.js";
import { verifyCreator } from "../middleware/verifyCreator_middleware.js";
import {
  createbrandProfile,
  getbrandProfile,
  updatebrandProfile,
} from "../controller/brandProfile_controller.js";
import { verifyBrand } from "../middleware/verifyBrand_middleware.js";
import {
  createCampaign,
  deleteCampaign,
  getallCampaign,
  getCampaignById,
  updateCampaign,
} from "../controller/campaign_controller.js";
const router = Router();
// user
router.route("/register").post(registerUser);
router.route("/loginUser").post(loginUser);
router.route("/logoutUser").post(verifyJWT, logoutUser);
router.route("/refresh-Token").post(verifyJWT, refreshAccessToken);
router.route("/getUser").get(verifyJWT, getCurrentUser);

// create creator profile
router.route("/creatorProfile").post(verifyJWT, creatorProfile);
router.route("/update_creatorProfile").patch(verifyJWT, update_creatorProfile);
router
  .route("/getcreatorProfile")
  .get(verifyJWT, verifyCreator, getCreatorProfile);

// create brand
router.route("/createBrand").post(verifyJWT, createbrandProfile);
router
  .route("/updatebrandProfile")
  .patch(verifyJWT, verifyBrand, updatebrandProfile);
router.route("/getbrandProfile").get(verifyJWT, verifyBrand, getbrandProfile);

// CAMPAIGN ROUTES
router.route("/createCampaign").post(verifyJWT, verifyBrand, createCampaign);
router.route("/getallCampaign").get(verifyJWT, verifyBrand, getallCampaign);
router
  .route("/updateCampaign/:campaignId")
  .patch(verifyJWT, verifyBrand, updateCampaign);
router
  .route("/deleteCampaign/:campaignId")
  .delete(verifyJWT, verifyBrand, deleteCampaign);
// dynamic route
router
  .route("/getCampaignById/:campaignId")
  .get(verifyJWT, verifyBrand, getCampaignById);
router.route("/:creatorId").get(verifyJWT, getCreatorById);
export { router };

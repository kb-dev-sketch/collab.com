import { Router } from "express";
const router = Router();

import { verifyJWT } from "../middleware/auth_middleware.js";
import { verifyBrand } from "../middleware/verifyBrand_middleware.js";
import {
  createbrandProfile,
  getbrandProfile,
  updatebrandProfile,
} from "../controller/brandProfile_controller.js";
router.route("/createBrand").post(verifyJWT, verifyBrand, createbrandProfile);
router
  .route("/updatebrandProfile")
  .patch(verifyJWT, verifyBrand, updatebrandProfile);
router.route("/getbrandProfile").get(verifyJWT, verifyBrand, getbrandProfile);
export { router as brandRouter };

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
} from "../controller/creatorProfile.js";
import { verifyCreator } from "../middleware/verifyCreator.js";
const router = Router();

router.route("/register").post(registerUser);
router.route("/loginUser").post(loginUser);
router.route("/logoutUser").post(verifyJWT, logoutUser);
router.route("/refresh-Token").post(verifyJWT, refreshAccessToken);
router.route("/getUser").get(verifyJWT, getCurrentUser);
router.route("/creatorProfile").post(verifyJWT, creatorProfile);
router.route("/update_creatorProfile").patch(verifyJWT, update_creatorProfile);
router.route("/getcreatorProfile").get(verifyJWT,verifyCreator, getCreatorProfile);
router.route("/:creatorId",verifyJWT,getCreatorById)
export { router };

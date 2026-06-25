import { Router } from "express";
import {
  loginUser,
  registerUser,
  logoutUser,
  refreshAccessToken,
  getCurrentUser,
} from "../controller/userController.js";
import { verifyJWT } from "../middleware/auth_middleware.js";
const router = Router();

router.route("/register").post(registerUser);
router.route("/loginUser").post(loginUser);
router.route("/logoutUser").post(verifyJWT, logoutUser);
router.route("/refresh-Token").post(verifyJWT, refreshAccessToken);
router.route("/getUser").get(verifyJWT, getCurrentUser);
export { router };

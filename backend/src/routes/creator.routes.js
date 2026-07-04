import { Router } from "express";
const router = Router();
import { verifyJWT } from "../middleware/auth_middleware.js";
import { verifyCreator } from "../middleware/verifyCreator_middleware.js";
import {
  creatorProfile,
  getCreatorById,
  getCreatorProfile,
  update_creatorProfile,
} from "../controller/creatorProfile_controller.js";
router.route("/creatorProfile").post(verifyJWT, verifyCreator, creatorProfile);
router
  .route("/update_creatorProfile")
  .patch(verifyJWT, verifyCreator, update_creatorProfile);
router
  .route("/getcreatorProfile")
  .get(verifyJWT, verifyCreator, getCreatorProfile);
router.route("/:creatorId").get(verifyJWT, getCreatorById);

export { router as creatorRouter };

import { Router } from "express";
import { registerUser } from "../controller/userController.js";
const router = Router();

router.route("/register").post(registerUser);
export { router };

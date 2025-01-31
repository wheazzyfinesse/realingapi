import express from "express";
const router = express.Router();
import {
	registerUser,
	logoutUser,
	verifyAccount,
	getVerificationCode,
	loginUser,
	getUserProfile,
	updateUserProfile,
	deleteUserProfile,
	getUsers,
	getUser,
	deleteUser,
	updateUser,
} from "../controllers/userControllers.js";
import { authenticate, authorizeAdmin } from "../middlewares/auth.js";

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/verify", authenticate, getVerificationCode);
router
	.route("/profile")
	.post(verifyAccount)
	.get(authenticate, getUserProfile)
	.put(authenticate, updateUserProfile)
	.delete(authenticate, deleteUserProfile);

// Admin routes
router.route("/").get(authenticate, authorizeAdmin, getUsers);
router
	.route("/:id")
	.get(authenticate, authorizeAdmin, getUser)
	.delete(authenticate, authorizeAdmin, deleteUser)
	.put(authenticate, authorizeAdmin, updateUser);

export default router;

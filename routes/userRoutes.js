import express from "express";
const router = express.Router();
import {
	registerUser,
	loginUser,
	getUserProfile,
	updateUserProfile,
	getAllUsers,
	getUser,
	deleteUser,
	updateUser,
	logoutUser,
} from "../controllers/userControllers.js";
import { authenticate, authorizeAdmin } from "../middlewares/auth.js";

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router
	.route("/profile")
	.get(authenticate, getUserProfile)
	.put(authenticate, updateUserProfile);

// Admin routes
router.route("/").get(authenticate, authorizeAdmin, getAllUsers);
router
	.route("/:id")
	.get(authenticate, authorizeAdmin, getUser)
	.delete(authenticate, authorizeAdmin, deleteUser)
	.put(authenticate, authorizeAdmin, updateUser);

export default router;

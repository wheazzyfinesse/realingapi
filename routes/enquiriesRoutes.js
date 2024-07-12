import {
	addEnquiry,
	getAllEnquiries,
	getEnquiry,
	updateEnquiry,
	deleteEnquiry,
} from "../controllers/enquiryControllers.js";
import { authenticate, authorizeAdmin } from "../middlewares/auth.js";

import express from "express";
const router = express.Router();

router.route("/").get(authenticate, authorizeAdmin, getAllEnquiries);

router.route("/:id/addenquiry").post(authenticate, addEnquiry);
router
	.route("/:id")
	.get(authenticate, getEnquiry)
	.put(authenticate, updateEnquiry)
	.delete(authenticate, deleteEnquiry);

export default router;

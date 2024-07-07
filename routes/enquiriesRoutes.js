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

router
	.route("/")
	.post(authenticate, addEnquiry)
	.get(authenticate, authorizeAdmin, getAllEnquiries);
router
	.route("/:id")
	.get(authenticate, getEnquiry)
	.put(authenticate, authorizeAdmin, updateEnquiry)
	.delete(authenticate, deleteEnquiry);

export default router;

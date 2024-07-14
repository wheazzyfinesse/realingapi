import {
	addEnquiry,
	addAnonEnquiry,
	getAllEnquiries,
	getEnquiry,
	updateEnquiry,
	deleteEnquiry,
} from "../controllers/enquiryControllers.js";
import { authenticate, authorizeAdmin } from "../middlewares/auth.js";

import express from "express";
const router = express.Router();

router.route("/").get(authenticate, authorizeAdmin, getAllEnquiries);
router.route("/addanonenquiry").post(addAnonEnquiry);

router.route("/:id/addenquiry").post(authenticate, addEnquiry);
router
	.route("/user")
	.get(authenticate, getEnquiry)
router
	.route("/:id")
	.put(authenticate, updateEnquiry)
	.delete(authenticate, deleteEnquiry);

export default router;

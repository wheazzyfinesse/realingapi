import {
	addProperty,
	getProperties,
	getProperty,
	updateProperty,
	deleteProperty,
} from "../controllers/propertyControllers.js";
import { authenticate, authorizeAdmin } from "../middlewares/auth.js";

import express from "express";
const router = express.Router();

router
	.route("/")
	.post(authenticate, authorizeAdmin, addProperty)
	.get(getProperties);
router
	.route("/:id")
	.get(getProperty)
	.put(authenticate, authorizeAdmin, updateProperty)
	.delete(authenticate, authorizeAdmin, deleteProperty);

export default router;

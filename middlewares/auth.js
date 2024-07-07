import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

// <<==========AUTHORIZATION AND AUTHENTICATION: USER ROLES AND ACCESS============>>
// Using the created token for access
// to validate the users and the routes they have access to

// User only authenticatiopn
const authenticate = async (req, res, next) => {
	const authHeader = req.headers.cookie;

	if (authHeader && authHeader.startsWith("token")) {
		const token = authHeader.split("=")[1];
		// const tokenId = JSON.parse(token);
		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			req.user = await User.findById(decoded.userId).select("-password");
			next();
		} catch (error) {
			res.status(401).json({ message: "Not authorized, token failed" });
		}
	} else {
		res
			.status(401)
			.json({ message: "Not authorized, no token please login or register" });
	}
};

// Admin only authorization
const authorizeAdmin = async (req, res, next) => {
	// Check if the user is an Admin after they must have been authenticated
	if (req.user && req.user.isAdmin) {
		// If the user is authenticated and is also an Admin
		// grant access to the requested routes
		next();
	} else {
		res.status(401).send("Not Authorized, not an Admin");
	}
};
export { authenticate, authorizeAdmin };

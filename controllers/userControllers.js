import jwt from "jsonwebtoken";
import UserProperties from "../models/userModel.js";
import bcrypt from "bcrypt";
import createToken from "../middlewares/createToken.js";

// USER CONTROLLERS=============================================
// Register User
const registerUser = async (req, res) => {
	const { username, email } = req.body;
	try {
		const existingUser = await UserProperties.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ message: "User already exists" });
		} else {
			const salt = await bcrypt.genSalt(10);
			const hashedPassword = await bcrypt.hash(req.body.password, salt);

			const user = await UserProperties.create({
				username,
				email,
				password: hashedPassword,
			});
			const userId = user._id;
			createToken(res, userId);
			// Set the token in a header
			const { password, ...userInfo } = user._doc;
			res.status(201).json(userInfo);
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Server Error" });
	}
};

// Login User
const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await UserProperties.findOne({ email });
		if (!user) {
			return res.status(400).json({
				message: "Invalid Credentials, try again or register an account",
			});
		} else {
			const passwordValid = await bcrypt.compare(password, user.password);
			if (!passwordValid) {
				throw new Error(
					"Invalid Credentials, try again or register an account",
				);
			} else {
				const userId = user._id;
				// Generate JWT token
				createToken(res, userId);
				const { password, ...userInfo } = user._doc;
				res.status(201).json(userInfo);
			}
		}
	} catch (error) {
		res.status(500).json({ error, message: "Log in failed!" });
	}
};

// Logout User

const logoutUser = (req, res) => {
	res.clearCookie("token");
	res.status(200).json({ message: "Logged out successfully" });
};
// Update Profile
const updateUserProfile = async (req, res) => {
	try {
	} catch (error) {
		res.status(500).json({ message: "Server Error" });
	}
};

// Get User Profile
const getUserProfile = async (req, res) => {
	try {
	} catch (error) {
		res.status(500).json({ message: "Server Error" });
	}
};

// ADMIN CONTROLLERS=============================================
// Get All Users
const getAllUsers = async (req, res) => {
	try {
		const users = await UserProperties.find();
	} catch (error) {
		res.status(500).json({ message: "Server Error" });
	}
};

// Get User
const getUser = async (req, res) => {
	try {
	} catch (error) {
		res.status(500).json({ message: "Server Error" });
	}
};

// Update User
const updateUser = async (req, res) => {
	try {
	} catch (error) {
		res.status(500).json({ message: "Server Error" });
	}
};

// Delete User
const deleteUser = async (req, res) => {
	try {
	} catch (error) {
		res.status(500).json({ message: "Server Error" });
	}
};

// EXPORT CONTROLLERS================================================================
export {
	registerUser,
	loginUser,
	logoutUser,
	getUserProfile,
	updateUserProfile,
	getAllUsers,
	getUser,
	deleteUser,
	updateUser,
};

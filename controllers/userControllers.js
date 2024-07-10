import jwt from "jsonwebtoken";
import UserProperties from "../models/userModel.js";
import bcrypt from "bcrypt";
import createToken from "../middlewares/createToken.js";

// USER CONTROLLERS=============================================
// Register User
const registerUser = async (req, res) => {
	const { username, email, password } = req.body;
	// Check if inputs are valid
	if (!username || !email || !password) {
		return res.status(400).json({ message: "All fields are required" });
	}
	// Check if user already exists
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
			return res.status(201).json(userInfo);
		}
	} catch (error) {
		return res.status(500).json({ message: "Server Error" });
	}
};

// Login User
const loginUser = async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(400).json({ message: "All fields are required" });
	}
	try {
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
				console.log(req.headers);
				const { password, ...userInfo } = user._doc;
				return res.status(201).json(userInfo);
			}
		}
	} catch (error) {
		res.status(500).json({ error, message: "Log in failed!" });
	}
};

// Logout User

const logoutUser = (_, res) => {
	res.clearCookie("token");
	res.status(200).json({ message: "Logged out successfully" });
};

// Get User Profile
const getUserProfile = async (req, res) => {
	try {
		const user = await UserProperties.findById(req.user._id);
		if (!user) {
			return res.status(400).json("User not found");
		} else {
			const { password, ...userInfo } = user._doc;
			return res.status(200).json(userInfo);
		}
	} catch (error) {
		res.status(500).json({ message: "Server Error" });
	}
};

// Updating current user profile
const updateUserProfile = async (req, res) => {
	const username = req.body.username;
	const email = req.body.email;
	// Check if all fields are correctlty filled
	if (!username || !email) {
		throw new Error("username or Email cannot be empty");
	}

	// Confirm if the user data already exists
	const user = await UserProperties.findById(req.user._id);
	const duplicateUser = await UserProperties.findOne({ email });
	if (duplicateUser !== null) {
		if (user.email !== email && email === duplicateUser.email) {
			throw new Error("Email already exists");
		}
	}

	if (user) {
		user.username = username || user.username;
		user.email = email || user.email;
		user.phone = req.body.phone || user.phone;
		user.image = req.body.image || user.image;
		user.address = req.body.address || user.address;
		user.city = req.body.city || user.city;
		user.state = req.body.state || user.state;
		user.zip = req.body.zip || user.zip;
		user.country = req.body.country || user.country;
		user.isAdmin = req.body.isAdmin || user.isAdmin;

		if (req.body.password) {
			const salt = await bcrypt.genSalt(10);
			const hashedPassword = await bcrypt.hash(req.body.password, salt);
			user.password = hashedPassword;
		}

		const updatedUser = await user.save();
		const { password, ...rest } = updatedUser._doc;
		console.log(rest);
		res.json({
			_id: updatedUser._id,
			username: updatedUser.username,
			email: updatedUser.email,
			phone: updatedUser.phone,
			image: updatedUser.image,
			address: updatedUser.address,
			city: updatedUser.city,
			state: updatedUser.state,
			zip: updatedUser.zip,
			country: updatedUser.country,
			isAdmin: updatedUser.isAdmin,
		});
	} else {
		res.status(404);
		throw new Error("User not found");
	}
};
// Update the user
// const updateUserProfile = async (req, res) => {
// 	const username = req.body.username;
// 	const email = req.body.email;

// 	// Check if all fields are correctly filled
// 	if (!username || !email) {
// 		return res.status().json("Name, Email or Phone cannot be empty");
// 	}

// 	// Confirm if the user data already exists
// 	const user = await UserProperties.findById(req.user._id);
// 	const duplicateUser = await UserProperties.findOne({ email });

// 	if (duplicateUser !== null) {
// 		if (user.email !== email && email === duplicateUser.email) {
// 			return res.status(400).json("Email already exists");
// 		}

// 	if (user) {
// 		user.username = username || user.username;
// 		user.email = email || user.email;
// 		user.phone = req.body.phone || user.phone;
// 		user.image = req.body.image || user.image;
// 		user.address = req.body.address || user.address;
// 		user.city = req.body.city || user.city;
// 		user.state = req.body.state || user.state;
// 		user.zip = req.body.zip || user.zip;
// 		user.country = req.body.country || user.country;

// 		if (req.body.password) {
// 			const salt = await bcrypt.genSalt(10);
// 			const hashedPassword = await bcrypt.hash(req.body.password, salt);
// 			user.password = hashedPassword;
// 		}

// 		const user = await user.save();
// 		const { password, ...updatedUser } = user._doc;
// 		console.log(updatedUser);
// 		return res.status(200).res.json(updatedUser);
// 	} else {
// 		return res.status(404).json(error);
// 	}
// };

const deleteUserProfile = async (req, res) => {
	try {
		await UserProperties.findByIdAndDelete(req.user._id);
		return res.status(200).json("Account deleted Successfully");
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
		const user = await UserProperties.findById(req.params.id);
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		} else {
			return res.status(200).json(user);
		}
	} catch (error) {
		res.status(500).json(error);
	}
};

// Update User
const updateUser = async (req, res) => {
	// Check if inputs are valid
	if (!username || !email || password) {
		return res.status(400).json({ message: "At least one field is required" });
	}
	// Update user data
	if (req.body.password) {
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(req.body.password, salt);
	}
	// Update user in the database
	try {
		const user = await UserProperties.findByIdAndUpdate(
			req.params.id,
			{ ...req.body, password: hashedPassword },
			{
				new: true,
			},
		);
		return res.status(200).json(user);
	} catch (error) {
		res.status(500).json(error);
	}
};

// Delete User
const deleteUser = async (req, res) => {
	try {
		await UserProperties.findByIdAndDelete(req.params.id);
		return res.status(200).json({ message: "User deleted successfully" });
	} catch (error) {
		res.status(500).json(error);
	}
};

// EXPORT CONTROLLERS================================================================
export {
	registerUser,
	loginUser,
	logoutUser,
	getUserProfile,
	updateUserProfile,
	deleteUserProfile,
	getAllUsers,
	getUser,
	deleteUser,
	updateUser,
};

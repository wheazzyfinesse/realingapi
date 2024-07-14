import UserProperties from "../models/userModel.js";
import bcrypt from "bcrypt";
import { createToken, createOtp } from "../middlewares/createToken.js";
import { sendMailNotification, sendMailOtp } from "../middlewares/sendmail.js";

// USER CONTROLLERS=============================================
// Register User
const registerUser = async (req, res) => {
	const { username, email, password } = req.body;
	// Check if inputs are valid
	if (!username || !email || !password) {
		return res.status(400).json("All fields are required");
	}
	// Check if user already exists
	try {
		const existingUser = await UserProperties.findOne({ email });
		if (existingUser) {
			return res.status(400).json("User already exists");
		}
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
		const user = new UserProperties({
			username,
			email,
			password: hashedPassword,
		});
		const otp = createOtp();
		const id = user._id;
		const message = `Registration successful, if you receive this message and you did not take this action please disregard this notification, otherwise continue your registration and verify account with the your one time password provided ${otp}`;
		const type = "register";
		const subject = "You Registered at Realist Realty";
		const mailUser = await sendMailNotification(
			email,
			id,
			otp,
			subject,
			message,
			type,
		);

		if (mailUser !== "Delivered") {
			return res
				.status(400)
				.json("Failed to register, could not notify log in");
		}

		user.otp = otp;
		user.save();
		const userId = user._id;
		const token = createToken(res, userId);
		const { password: _, otp: __, ...userInfo } = user._doc;
		return res.status(201).json({ ...userInfo, token });
	} catch (error) {
		return res.status(500).json(error);
	}
};

// Login User
const loginUser = async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(400).json("All fields are required");
	}

	try {
		const user = await UserProperties.findOne({ email });
		if (!user) {
			return res
				.status(400)
				.json("Invalid Credentials, try again or register an account");
		}
		const passwordValid = await bcrypt.compare(
			req.body.password,
			user.password,
		);
		if (!passwordValid) {
			return res
				.status(400)
				.json("Invalid Credentials, try again or register an account");
		}
		const userId = user._id;
		// Generate JWT token
		const token = createToken(res, userId);
		const { password, ...userInfo } = user._doc;
		const message =
			"Login successful, if you receive this message and you did not take this action please secure your account, otherwise disregard this notification";
		const type = "login";
		const subject = "You Logged In to Realist Realty";
		const mailUser = await sendMailNotification(email, subject, message, type);
		if (mailUser !== "Delivered") {
			return res.status(400).json("Failed to login, could not notify log in");
		}
		{
			return res.status(200).json({ ...userInfo, token });
		}
	} catch (error) {
		return res.status(500).json(error);
	}
};

const verifyAccount = async (req, res) => {
	const { otp, id } = req.body
	if (!otp || !id) {
		return res.status(400).json("All fields are required");
	}
	try {
		const user = await UserProperties.findById(id)
		if (!user) {
			return res.status(400).json("User not found");
		}
		if (user.isVerified) {
			return res.status(400).json("User is already verified, please log in")
		}
		if (user.otp !== otp.toString()) {
			return res.status(400).json("Inavlid otp, unable to verify your account try again!")
		}
		const message = "Account verified successfully, you can now log in";
		const subject = "You Verified Your Account at Realist Realty";
		const type = "verify";
		const mailUser = await sendMailNotification(user.email,
			id,
			otp,
			subject,
			message,
			type);
		if (mailUser !== "Delivered") {
			return res
				.status(400)
				.json("Failed to verify account, could not notify account verification");
		}

		user.isVerified = true;
		user.save();
		const userId = user._id;
		const token = createToken(res, userId);
		const { password: _, otp: __, ...userInfo } = user._doc;
		return res.status(201).json({ ...userInfo, token });
	} catch (error) {
		return res.status(500).json(error)
	}
}

// Logout User

const logoutUser = (_, res) => {
	res.clearCookie("token");
	res.status(200).json("Logged out successfully");
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
		res.status(500).json(error);
	}
};

// Updating current user profile
const updateUserProfile = async (req, res) => {
	const username = req.body.username;
	const email = req.body.email;

	try {
		// Check if all fields are correctlty filled
		if (!username || !email) {
			return res.status(400).json("username or Email cannot be empty");
		}

		// Confirm if the user data already exists
		const user = await UserProperties.findById(req.user._id);
		const duplicateUser = await UserProperties.findOne({ email });
		if (duplicateUser !== null) {
			if (user.email !== email && email === duplicateUser.email)
				res.status(404).json("Email already exists");
		}

		if (!user) {
			return res.status(404).json("User not found");
		}

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
		const { password, ...userInfo } = updatedUser._doc;
		return res.status(200).json(userInfo);
	} catch (error) {
		return res.status(500).json(error);
	}
};

const deleteUserProfile = async (req, res) => {
	try {
		await UserProperties.findByIdAndDelete(req.user._id);
		return res.status(200).json("Account deleted Successfully");
	} catch (error) {
		res.status(500).json(error);
	}
};
// ADMIN CONTROLLERS=============================================
// Get Users
const getUsers = async (req, res) => {
	try {
		const users = await UserProperties.find();
		return res.status(200).json(users);
	} catch (error) {
		return res.status(500).json(error);
	}
};

// Get User
const getUser = async (req, res) => {
	try {
		const user = await UserProperties.findById(req.params.id);
		if (!user) {
			return res.status(404).json("User not found");
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
	if (!username || !email) {
		return res.status(400).json("username or email is required");
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
		return res.status(200).json("User deleted successfully");
	} catch (error) {
		res.status(500).json(error);
	}
};

// EXPORT CONTROLLERS================================================================
export {
	registerUser,
	loginUser,
	verifyAccount,
	logoutUser,
	getUserProfile,
	updateUserProfile,
	deleteUserProfile,
	getUsers,
	getUser,
	deleteUser,
	updateUser,
};

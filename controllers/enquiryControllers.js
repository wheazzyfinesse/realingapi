import { sendMailToAdmin, sendMailToUsers } from "../middlewares/sendmail.js";
import Property from "../models/propertyModel.js";

// ADMIN CONTROLLERS=============================================
// Add Enquiry
const makeEnquiry = async (req, res) => {
	const { message, subject } = req.body;
	const { email, _id } = req.user;

	try {
		// const response1 = sendMailToAdmin(email, subject, message);
		const response = await sendMailToUsers(email, message);
		console.log(response);

		return res.staus(200).json(response);
	} catch (error) {
		res.status(500).json({ message: "Server Error" });
	}
};

// Get All Enquiries
const getAllEnquiries = async (req, res) => {
	try {
	} catch (error) {
		res.status(500).json({ message: "Server Error" });
	}
};

// Get Enquiry
const getEnquiry = async (req, res) => {
	try {
	} catch (error) {
		res.status(500).json({ message: "Server Error" });
	}
};

// Update Enquiry
const updateEnquiry = async (req, res) => {
	try {
	} catch (error) {
		res.status(500).json({ message: "Server Error" });
	}
};

// Delete Enquiry
const deleteEnquiry = async (req, res) => {
	try {
	} catch (error) {
		res.status(500).json({ message: "Server Error" });
	}
};

// EXPORT CONTROLLERS================================================================
export {
	makeEnquiry,
	getAllEnquiries,
	getEnquiry,
	updateEnquiry,
	deleteEnquiry,
};

import { sendMailToAdmin, sendMailToUsers } from "../middlewares/sendmail.js";
import Property from "../models/propertyModel.js";

// ADMIN CONTROLLERS=============================================
// Add Enquiry
const addEnquiry = async (req, res) => {
	const { message, subject } = req.body;
	const { email, _id } = req.user;

	try {
		// const propertyEnq = await Property.find();
		const property = await Property.findById(req.params.id)
			.populate("enquiries")
			.populate("user", "_id");
		if (!propertyEnquiry) return res.status(404).json("Property not found");
		propertyEnquiry.enquiries.push({ user: _id, message, subject });
		console.log(propertyEnquiry);
		await propertyEnquiry.save();
		const propertyEnquiry = property.enquiries.map((enquiry) => {
			return {
				_id: enquiry._id,
				user: enquiry.user._id,
				message: enquiry.message,
				subject: enquiry.subject,
				createdAt: enquiry.createdAt,
				updatedAt: enquiry.updatedAt,
			};
		});
		console.log(propertyEnquiry);
		// const response1 = sendMailToAdmin(email, subject, message);
		// const response = await sendMailToUsers(email, message);
		return res.staus(200).json(propertyEnquiry);
	} catch (error) {
		res.status(500).json("Server Error");
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
	addEnquiry,
	getAllEnquiries,
	getEnquiry,
	updateEnquiry,
	deleteEnquiry,
};

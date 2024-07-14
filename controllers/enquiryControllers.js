import { sendMailToAdmin, sendMailToUsers } from "../middlewares/sendmail.js";
import UserProperties from "../models/userModel.js";
import { Enquiries, AnonEnquiries } from "../models/enquiryModel.js";
import Properties from "../models/propertyModel.js";

// ADMIN CONTROLLERS=============================================
// Add Enquiry
const addEnquiry = async (req, res) => {
	try {
		const { message, subject } = req.body;
		const { email, _id } = req.user; // Ensure req.user is set by your authentication middleware
		if (!message || !subject) {
			return res.status(400).json("All fields are required");
		}
		const propertyId = req.params.id;
		const property = await Properties.findById(propertyId);
		const user = await UserProperties.findById(_id);

		const enquiry = new Enquiries({
			property: propertyId,
			user: _id,
			message,
			subject,
		});
		await enquiry.save();

		property.enquiries.push(enquiry._id);
		await property.save();
		const mailAdmin = await sendMailToAdmin(email, message, subject, user.username);
		const mailUser = await sendMailToUsers(email);
		if (mailAdmin !== "Delivered" && mailUser !== "Delivered") {
			return res.status(400).json("Failed to make an enquiry");
		}

		return res.status(200).json(enquiry);

	} catch (error) {
		return res.status(500).json(error);
	}
};
// Add anonymous enquiry
const addAnonEnquiry = async (req, res) => {
	const { firstName, lastName, email, phone, message } = req.body;
	try {

		if (!firstName || !lastName || !email || !phone || !message) {
			return res.status(400).json("All fields are required");
		}

		const enquiry = new AnonEnquiries({
			firstName: firstName,
			lastName: lastName,
			email: email,
			phone: phone,
			message: message,
		});

		await enquiry.save();
		const username = firstName + " " + lastName
		const subject = "Anonymous Enquiry from " + firstName

		const mailAdmin = await sendMailToAdmin(email, message, subject, username);
		const mailUser = await sendMailToUsers(email);
		if (mailAdmin !== "Delivered" && mailUser !== "Delivered") {
			return res.status(400).json("Failed to make an enquiry");
		}
		return res.status(200).json("Your enquiry has been sent, thank you");

	} catch (error) {
		return res.status(400).json(error);
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
	const id = req.user._id

	try {
		const enquiry = await Enquiries.find({ user: id }).populate("property").sort({ createdAt: -1 });
		if (!enquiry) {
			return res.status(404).json("Enquiry not found");
		} else
			return res.status(200).json(enquiry);

	} catch (error) {
		return res.status(500).json(error);
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
	addAnonEnquiry,
	getAllEnquiries,
	getEnquiry,
	updateEnquiry,
	deleteEnquiry,
};

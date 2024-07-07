import property from "../models/propertyModel.js";

// ADMIN CONTROLLERS=============================================
// Add Enquiry
const addEnquiry = async (req, res) => {
	const { tilte, email, password } = req.body;

	try {
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
	addEnquiry,
	getAllEnquiries,
	getEnquiry,
	updateEnquiry,
	deleteEnquiry,
};
